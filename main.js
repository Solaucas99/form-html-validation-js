class ValidaForm {
    constructor() {
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.username = '';
        this.cpf = '';
        this.pass = '';
        this.confirmPass = '';
        ValidaForm.eventos();
    }

    static geraDigito(cpfLimpo) {
        let cpfContador = cpfLimpo.length + 1;
        let acumulador = 0;
        for (let i = 0; i < cpfLimpo.length; i++) {
            acumulador += Number(cpfLimpo[i]) * cpfContador;
            cpfContador--
        }
        const digitoFinal = 11 - (acumulador % 11);
        return digitoFinal < 10 ? digitoFinal : 0;
    }

    static eventos() {
        document.addEventListener("click", (e) => {
            const el = e.target;
            if (el.id === "btn-clear") formEnvio.reset();
        })

        document.addEventListener("input", (e) => {
            const el = e.target;
            if (el.id === "cpf") {
                el.value = el.value.replace(/[^0-9.-]/g, '');
                if (el.value.length === 3) el.value = el.value.replace(/^(\d{3})/, "$1.");
                if (el.value.length === 7) el.value = el.value.replace(/^(\d{3})([.]\d{3})/, "$1$2.");
                if (el.value.length === 11) el.value = el.value.replace(/^(\d{3})([.]\d{3})([.]\d{3})/, "$1$2$3-")
            }
        
            if (el.id === "name" || el.id === "lastname") {
                el.maxLength = 15;
                el.value = el.value.replace(/[^A-Za-z ]/g, '');
            }
        
            if (el.id === "username") {
                el.maxLength = 12;
                el.minLength = 3;
                el.value = el.value.replace(/\W+/g, '');
            }
        
            if (el.id === "pass" || el.id === "confirmPass") {
                el.maxLength = 12;
                el.minLength = 6;
                el.value = el.value.replace(/\s+/g, '');
            }
        })

        document.addEventListener("submit", (e) => {
            validaForm.validaFormulario();
            e.preventDefault();
        })
    }

    geraId() {
        let idGerado = Math.random() * (arrayPersons.length * 2000 - 1) + 1;
        this.id = Math.floor(idGerado);
        return true;
    }


    validaNome() {
        const nomeEnviado = document.querySelector('#name').value;

        if (typeof nomeEnviado !== 'string') throw new TypeError("Nome inválido");
        if ((/\d+/g).test(nomeEnviado)) throw new TypeError("Nome inválido");
        if (nomeEnviado.length === 0) return alert("Nome com tamanho inválido");

        this.nome = nomeEnviado.toUpperCase();
        return true;
    }

    validaSobrenome() {
        const sobrenomeEnviado = document.querySelector('#lastname').value;

        if (typeof sobrenomeEnviado !== 'string') throw new TypeError("Sobrenome inválido");
        if ((/\d+/g).test(sobrenomeEnviado)) throw new TypeError("Sobrenome inválido");
        if (sobrenomeEnviado.length === 0) return alert("Sobrenome com tamanho inválido");

        this.sobrenome = sobrenomeEnviado.toUpperCase();
        return true;
    }

    validaUsuario() {
        const usuarioEnviado = document.querySelector('#username').value;

        if (typeof usuarioEnviado !== 'string') throw new TypeError("Username inválido");
        if ((/\W+/g).test(usuarioEnviado)) throw new TypeError("Username inválido");
        if (usuarioEnviado.length < 3 || usuarioEnviado.length > 12) return alert("Username com tamanho inválido");

        this.username = usuarioEnviado;
        return true;
    }

    validaCPF() {
        const cpfEnviado = document.querySelector('#cpf').value.replace(/\D+/g, '');

        if (cpfEnviado.length !== 11) return alert("CPF com tamanho inválido");
        if (typeof cpfEnviado !== 'string') throw new TypeError("CPF inválido");
        if ((/[^0-9.-]/g).test(cpfEnviado)) throw new TypeError("CPF inválido");
        if (cpfEnviado === cpfEnviado.charAt(0).repeat(11)) return alert("CPF inválido");

        const cpfLimpo = cpfEnviado.slice(0, -2);
        const digito1 = ValidaForm.geraDigito(cpfLimpo);
        const digito2 = ValidaForm.geraDigito(cpfLimpo + digito1);

        const cpfFinal = (cpfLimpo + digito1 + digito2).toString();
        if (cpfFinal === cpfEnviado) {
            this.cpf = cpfFinal;
            return true;
        } else {
            alert("CPF Inválido");
            return false;
        }
    }

    validaPassword() {
        const senhaEnviada = document.querySelector('#pass').value;
        const senhaConfirmada = document.querySelector('#confirmPass').value;

        if (typeof senhaEnviada !== 'string' || typeof senhaConfirmada !== 'string') throw new TypeError("Sobrenome inválido");
        if (senhaEnviada.length === 0 || senhaConfirmada.length === 0) return alert("Senha com tamanho inválido");

        if (senhaEnviada === senhaConfirmada) {
            this.pass = senhaEnviada;
            this.confirmPass = senhaConfirmada;
            return true;
        } else {
            alert("Senhas incompatíveis")
            return;
        }
    }

    validaFormulario() {
        if (!this.geraId()) return;
        if (!this.validaNome()) return;
        if (!this.validaSobrenome()) return;
        if (!this.validaUsuario()) return;
        if (!this.validaCPF()) return;
        if (!this.validaPassword()) return;
        arrayPersons.push(validaForm);
        validaForm = new ValidaForm();
        console.log(arrayPersons);
        return alert("Formulário enviado com sucesso!")
    }
}

let validaForm = new ValidaForm();
const arrayPersons = [];
