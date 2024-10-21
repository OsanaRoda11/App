
const { default: inquirer } = require("inquirer");

const {select, input, checkbox} = require ('@inquirer/prompts')

const fs = require('fs').promises

let mensagem = 'Bem-vindo ao App de metas'

let metas = []

const carregarMeta = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf8")
        metas = JSON.parse(dados)
        console.log("Metas carregadas: "+ metas)
    } catch (erro){
        console.log("Erro ao carregar metas, inicializando como vazio. ", erro);
        metas = []
    }
}

const salvarMetas = async () => {
    try{  
        await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
    }catch (erro) {
        console.log("Erro ao salvar metas ", erro);
    }
}

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

    mensagem = "Meta cadastrada com sucesso!"
}


const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as  setas para mudar de metas, o espaco para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta seleccionada!"
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
    mensagem = "Meta(s) concluida(s)"
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
        message: realizadas.length + " Metas realizadas",
        choices: [...realizadas]
    })

}

const metasNaoRealizadas = async () => {
    const naoRealizadas = metas.filter((meta) => {
        return meta.checked == false
    })

    if(naoRealizadas.length == 0){
        console.log("Nao existe metas não realizadas :)")
        return
    }

    await select({
        message: naoRealizadas.length +"- Metas nao realizadas",
        choices: [...naoRealizadas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itensParaDeletar = await checkbox({
        message: "Seleccione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensParaDeletar.length == 0){
        console.log("Nenhum item seleccionado para deletar")
        return
    }

    itensParaDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    console.log("Meta(s) deletada(s) com sucesso!")
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""

    }
}
const start = async () => {

    carregarMeta()

    while(true){

        mostrarMensagem()
        await salvarMetas()

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
                    name: "Metas nao realizadas",
                    value: "naoRealizadas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
                
                break
            case "listar":
                await listarMetas()
                console.log("Vamos listar")  
                break
            case "realizadas":
                await metasRealizadas()
                break    
            case "naoRealizadas":
                await metasNaoRealizadas()
                break    
            case "deletar":
                await deletarMetas()    
                break
            case "sair":
                return      
        }
    }
}

start()