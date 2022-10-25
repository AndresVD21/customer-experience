export class Customer {
    id: string;
    firstName: string;
    lastName: string;
    status: string |'active' | 'pending' | 'inactive';
    email: string;
    phone?: string;

    constructor(id: string, firstName: string, lastName: string, status: (string |'active' | 'pending' | 'inactive'), email: string, phone?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
        this.email = email;
        this.phone = phone;
    }
}
