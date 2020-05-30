class Alert{
    constructor(alertType, alertMessage ){
        this.type = alertType
        this.message = alertMessage
    }

    getJson(){
        return {Type : this.type, Message : this.message}
    }
}

const alertType = {"Success": "success", "Warning": "warning", "Error" : "danger"}


module.exports = {Alert, alertType}