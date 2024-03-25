let bancoContatos = JSON.parse(localStorage.getItem('contatos'));

if(!bancoContatos)
{
    bancoContatos = [
            {
                "nomeContato" : "João",
                "telContato" : "(31) 9 99216-5754"
            },
            {
                "nomeContato" : "Maria",
                "telContato" : "(31) 9 99216-5754" 
            }
    ]
}

function limparForm()
{
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
}




function cadastraNovocontato()
{
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;

    if((nome.length < 2 ) || (telefone.length < 11)){
        if(nome.length < 2){
            alert("é necessario que o nome tenha no minimo 2 letras!");
        }
        if(telefone.length < 11){
            alert("é necessario que o Telefone siga esse padrão: (DD) 9 ####-####.");
        }

    }else{
        var novoContato = {
            "nomeContato" : nome,
            "telContato" : numberMask(telefone)
        }

        bancoContatos.push(novoContato);
        localStorage.setItem('contatos', JSON.stringify(bancoContatos));
        limparForm();
        alert("contato cadastrado com sucesso!");
        exibirContatos();

        
    }
}

function filtro(){
    var filtros = document.getElementById("nomeBusca");
    exibirContatos(filtros.value.toLowerCase());

}

function numberMask(telefone) {
    return telefone = `( ${telefone.substring(0, 2)} ) ${telefone.substring(2, 3)} ${telefone.substring(3, 7)}-${telefone.substring(7)}`;
}


function exibirContatos(filtroBusca)
{
    var strCard = "";

    for (let index = 0; index < bancoContatos.length; index++){
        const contato = bancoContatos[index];
        
        var dados = [index, contato.nomeContato, contato.telContato];
      
        if(contato.nomeContato.toLowerCase().includes(filtroBusca)) {
        strCard += `<div class="card mx-1 my-1 col-md-3">
        <div class="row justify-content-center pt-2">
            <div class="col-auto">
                    <center><h5 class="card-title" id="nm">${contato.nomeContato}</h5></center>
                    <p class="card-text" id="tl"> ${contato.telContato}</p>
            </div>
            <div class="row justify-content-center mb-2 mt-2 ">
            <a href= "https://web.whatsapp.com/"><button type="button" class="btn btn-success w-25 me-1"><a href= "https://web.whatsapp.com/" class="text-white">Me ligue</a></button>
            <button class="btn btn-danger w-25 me-1" type="button" onclick= "removerContato(${index})">Apagar</button>
            <button class="btn btn-info w-25" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${index}, ${contato.nomeContato},${contato.telContato}">Editar</button>
            </div>
        </div>
        </div>`
        } 
        else if(filtroBusca == null) {
            strCard += `<div class="card mx-1 my-1 col-md-3">
        <div class="row justify-content-center pt-2">
            <div class="col-auto">
                    <center><h5 class="card-title" id="nm">${contato.nomeContato}</h5></center>
                    <p class="card-text" id="tl"> ${contato.telContato}</p>
            </div>
            <div class="row justify-content-center mb-2 mt-2 ">
            <a href= "https://web.whatsapp.com/"><button type="button" class="btn btn-success w-25 me-1"><a href= "https://web.whatsapp.com/" class="text-white">Me ligue</a></button>
            <button class="btn btn-danger w-25 me-1" type="button" onclick= "removerContato(${index})">Apagar</button>
            <button class="btn btn-info w-25" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${index}, ${contato.nomeContato},${contato.telContato}">Editar</button>
            </div>
        </div>
        </div>`

        const exampleModal = document.getElementById('exampleModal')
        if(exampleModal)
        {
            exampleModal.addEventListener('show.bs.modal', event =>{
                const button = event.relatedTarget;

                var recipient = button.getAttribute('data-bs-whatever');

                var infos = recipient.split(",");

                const modalId = exampleModal.querySelector('#idIn');
                const modalNome = exampleModal.querySelector('#nomeEdit');
                const modalTel = exampleModal.querySelector('#telefoneEdit');

                modalId.value = infos[0];
                modalNome.value = infos[1];
                modalTel.value = infos[2];  
        
            })
        }
        }
    }
    document.querySelector('#tela').innerHTML = strCard
}

function editarContato(){
    var i = document.getElementById('idIn').value;
    var n = document.getElementById('nomeEdit').value;
    var t = document.getElementById('telefoneEdit').value;


    if((n.length < 2 ) || (t.length < 11)){
        if(nome.length < 2){
            alert("é necessario que o nome tenha no minimo 2 letras!");
        }
        if(telefone.length < 11){
            alert("é necessario que o Telefone siga esse padrão: (DD) 9 ####-####.");
        }
    }else{
        bancoContatos[i].nomeContato = n; 
        bancoContatos[i].telContato = t;

        localStorage.setItem("contatos", JSON.stringify(bancoContatos));
        alert("dados alterados com sucesso!");
        $('#exampleModal').modal('hide');
        exibirContatos();
    }
}


onload = () =>{
    exibirContatos();
}








function removerContato(id){
    var r = confirm("Prosseguir com a exclusão do contato?")
    if (r == true){
        let index = id;
        bancoContatos.splice(index, 1);

        localStorage.setItem("contatos", JSON.stringify(bancoContatos));

        alert("contato foi removido com sucesso");
        exibirContatos();
    }else(
        alert("Operção cancelada")
    )

}