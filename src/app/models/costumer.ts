export class Costumer {
    id: string;
    firsName: string;
    lastName: string;
    status: 'active' | 'pending' | 'inactive';
    email: string;
    phone?: string;

    constructor(id: string, firstName: string, lastName: string, status: ('active' | 'pending' | 'inactive'), email: string, phone?: string) {
        this.id = id;
        this.firsName = firstName;
        this.lastName = lastName;
        this.status = status;
        this.email = email;
        this.phone = phone;
    }
}
