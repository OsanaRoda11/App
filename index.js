
const {select, input} = require('@inquirer/prompts')
 
meta = [{
    value: "Tomar 1l de agua por dia",
    checked: false
}]
 metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({
        message: "Digite uma meta:"
    })

    if(meta.length === 0){
        console.log(" meta não pode ser vazia! ") 
        return
    }

    metas.push({
        value: meta, checked: false
    })
}
const start = async () => {
    
    while(true){
        const opcao = await select({
            message: "Menu >",
            choices: [
                {name: "Cadastrar meta", value: "cadastrar"},
                {name: "Listar metas", value: "listar"},
                {name: 'Sair', value:'sair'}
            ]
        })
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas)
                break
            case "listar":
                console.log("Vamos listar")  
                break
            case "sair": 
                console.log("Sair")
                return      
        }
    }
}

start()