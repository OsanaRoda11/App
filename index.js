/*
const {select, input, checkbox} = require('@inquirer/prompts')
 meta = {
    value: "Tomar 1l de agua por dia",
    checked: false
}
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

const listarMetas = async () => {
    const respostas = checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar/desmarcar e Enter para finalizar meta",
        choices: [...metas],
        instructions: false
    })
    
    if((await respostas).length === 0){
        console.log("Nenhuma meta seleccionada!")
        return
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    metas.forEach((m) => {
        m.checked = false
    })
    
    (respostas).forEach((resposta) => {
         meta = metas.find((m) => m.value === resposta);
        if (meta) {
            meta.checked = true;
        }
    });
    
    console.log("Meta(s) concluída(s)")
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
                await listarMetas() 
                break
            case "sair": 
                console.log("Sair")
                return      
        }
    }
}*/

const { default: inquirer } = require("inquirer");

const {select, input, checkbox} = require ('@inquirer/prompts')

let meta = {
    value: "Tomar 3l de agua por dia",
    checked: false
}

let metas = [meta]


const cadastrarMeta = async () => {
    const meta = await input({
        message: "Digite uma meta:"
    })

    if(meta.length == 0){
        console.log(" meta não pode ser vazia! ") 
        return
    }

    metas.push({
        value: meta, checked: false
    })
}


const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as  setas para mudar de metas, o espaco para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta seleccionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    console.log("Meta(s) concluida(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Nao existe metas realizadas :(")
        return
    }
    
    await select ({
        message: "Metas realizadas",
        choices: [...realizadas]
    })

}
const start = async () => {
    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                console.log("Vamos listar")  
                break
            case "realizadas":
                await metasRealizadas()
                break    
            case "sair":
                return      
        }
    }
}

start()