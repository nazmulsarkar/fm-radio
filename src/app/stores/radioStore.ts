import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Radio, RadioFormValues } from "../models/radio";
import { Pagination, PagingParams } from "../models/pagination";

export default class RadioStore {
    radioRegistry = new Map<string, Radio>();
    selectedRadio: Radio | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.radioRegistry.clear();
                this.loadRadios();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get radiosByDate() {
        return Array.from(this.radioRegistry.values());
    }

    loadRadios = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Radios.list(this.axiosParams);
            result.data.forEach(radio => {
                this.setRadio(radio);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadRadio = async (id: string) => {
        let radio = this.getRadio(id);
        if (radio) {
            this.selectedRadio = radio;
            return radio;
        } else {
            this.loadingInitial = true;
            try {
                radio = await agent.Radios.details(id);
                this.setRadio(radio);
                runInAction(() => {
                    this.selectedRadio = radio;
                })
                this.setLoadingInitial(false);
                return radio;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setRadio = (radio: Radio) => {
        this.radioRegistry.set(radio.id, radio);
    }

    private getRadio = (id: string) => {
        return this.radioRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createRadio = async (radio: RadioFormValues) => {
        try {
            const createdRadio = await agent.Radios.create(radio);
            const newRadio = new Radio(createdRadio);
            this.setRadio(newRadio);
            runInAction(() => {
                this.selectedRadio = newRadio;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateRadio = async (radio: RadioFormValues) => {
        try {
            await agent.Radios.update(radio);
            runInAction(() => {
                if (radio.id) {
                    let updatedRadio = { ...this.getRadio(radio.id), ...radio }
                    this.radioRegistry.set(radio.id, updatedRadio as Radio);
                    this.selectedRadio = updatedRadio as Radio;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteRadio = async (id: string) => {
        this.loading = true;
        try {
            await agent.Radios.delete(id);
            runInAction(() => {
                this.radioRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedRadio = () => {
        this.selectedRadio = undefined;
    }
}