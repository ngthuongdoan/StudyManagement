class Teacher{
    constructor({ name, email, number }) {
        this._name = name;
        this._email = email;
        this._number = number;
    }

    get name(){
        return this._name;
    }
    get email(){
        return this._email;
    }
    get number(){
        return this._number;
    }

}

module.exports = Teacher;