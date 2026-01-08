function messages(text){
    const message ={
        success: "operacion exitosa",
        error: "Error de ejecucion"
    }
    return message[text]
}