export interface Radio {
    id: string;
    title: string;
    frequency: string;
    created_at?: Date;
    updated_at?: Date;
}

export class Radio implements Radio {
    constructor(init?: RadioFormValues) {
        Object.assign(this, init);
    }
}

export class RadioFormValues {
    id?: string = undefined;
    title: string = '';
    frequency: string = '';
    created_at?: Date;
    updated_at?: Date;

    constructor(radio?: RadioFormValues) {
        if (radio) {
            this.id = radio.id;
            this.title = radio.title;
            this.frequency = radio.frequency;
            this.created_at = radio.created_at;
            this.updated_at = radio.updated_at;
        }
    }
}