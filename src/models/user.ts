export default class User {
    id?: number;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    address: string;
    profil_picture_url: string;
    user_role: string; //
    company_code: number;
    active: boolean;

    constructor(data: User){
        this.id = data.id;
        this.last_name = data.last_name;
        this.first_name = data.first_name;
        this.email = data.email;
        this.password = data.password;
        this.address = data.address;
        this.profil_picture_url = data.profil_picture_url;
        this.user_role = data.user_role;
        this.company_code = data.company_code;
        this.active = data.active;
    }

    public fullName(){
        return this.first_name + " " + this.last_name;
    }

    public role(){
        return this.user_role;
    }

    public isUser() {
        return this.user_role === "user";
    }

    public isAdmin() {
        return this.user_role === "admin";
    }

    public isTechnician() {
        return this.user_role === "technicien";
    }

    public isPlanning() {
        return this.user_role === "planning";
    }
}

