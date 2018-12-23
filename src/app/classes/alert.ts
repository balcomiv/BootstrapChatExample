import { AlertType } from '../enums/alert-type.enum';

export class Alert {
    text: string;
    type: AlertType;

    constructor(text: string, type: AlertType = AlertType.Success) {
        this.text = text;
        this.type = type;
    }
}
