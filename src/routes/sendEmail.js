import {receiveEmail} from '../controller/index'

const emailRoute = app =>{
    app.post("/email", receiveEmail)
}

export default emailRoute