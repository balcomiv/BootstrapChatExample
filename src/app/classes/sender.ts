export class Sender {
    firstName: string;
    lastName: string;
    photoUrl: string;
    
    constructor({firstName, lastName, photoUrl}: Sender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl = photoUrl;
    }
}