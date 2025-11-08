const httpCatsApi = () => {
    const apiUrl = "https://http.cat";
    
    const elements = {
        characterDisplay: document.getElementById("characterDisplay"),
        characterNameResult: document.getElementById("characterNameResult"),
        characterHouse: document.getElementById("characterHouse"),
        characterActor: document.getElementById("characterActor"),
        characterNickname: document.getElementById("characterNickname"),
        characterBirthdate: document.getElementById("characterBirthdate"),
        characterChildren: document.getElementById("characterChildren"),
        characterId: document.getElementById("characterId")
    };

    const images = {
        loading: "./RecursosAPI/img/loading.gif",
        notFound: "./RecursosAPI/img/NOencontrado.png", 
        default: "./RecursosAPI/img/Principal.png"
    };

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnNext"),
        prev: document.getElementById("btnPrev")
    };

    const statusInput = document.getElementById("characterName");
    let allStatusCodes = [];
    let currentIndex = 0;

    const statusCategories = {
        informational: "informational",
        success: "success",
        redirection: "redirection",
        "client error": "client-error",
        "server error": "server-error",
        unknown: "unknown"
    };

    const setLoading = () => {
        elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.loading}" alt="Buscando gato HTTP...">`;
        buttons.all.forEach(button => button.disabled = true);
    };

    const setLoadingComplete = () => {
        buttons.all.forEach(button => button.disabled = false);
    };

    // Los 20 códigos HTTP más comunes/relevantes
    const getAllStatusCodes = async () => {
        const statusCodes = [
            { 
                code: 100, 
                description: "Continue", 
                category: "informational", 
                meaning: "El servidor ha recibido la solicitud inicial y el cliente debe continuar", 
                commonUse: "Negociación de protocolos y solicitudes preliminares", 
                example: "Cambio de HTTP a HTTPS antes de enviar datos sensibles" 
            },
            { 
                code: 200, 
                description: "OK", 
                category: "success", 
                meaning: "La solicitud se ha completado exitosamente", 
                commonUse: "Respuesta estándar para solicitudes GET exitosas", 
                example: "Página web cargada correctamente" 
            },
            { 
                code: 201, 
                description: "Created", 
                category: "success", 
                meaning: "Recurso creado exitosamente en el servidor", 
                commonUse: "Después de crear un recurso via POST", 
                example: "Usuario registrado en base de datos" 
            },
            { 
                code: 204, 
                description: "No Content", 
                category: "success", 
                meaning: "Solicitud exitosa pero sin contenido para devolver", 
                commonUse: "APIs que no necesitan retornar datos después de una operación", 
                example: "DELETE requests exitosos" 
            },
            { 
                code: 301, 
                description: "Moved Permanently", 
                category: "redirection", 
                meaning: "Recurso movido permanentemente a nueva URL", 
                commonUse: "Redirecciones permanentes de URLs viejas", 
                example: "Cambio de dominio de empresa" 
            },
            { 
                code: 302, 
                description: "Found", 
                category: "redirection", 
                meaning: "Redirección temporal a otra URL", 
                commonUse: "Redirecciones temporales durante mantenimiento", 
                example: "Página en mantenimiento redirigida temporalmente" 
            },
            { 
                code: 304, 
                description: "Not Modified", 
                category: "redirection", 
                meaning: "Recurso no modificado desde la última solicitud", 
                commonUse: "Optimización de caché del navegador", 
                example: "Navegador usa versión cacheadá de recurso" 
            },
            { 
                code: 400, 
                description: "Bad Request", 
                category: "client error", 
                meaning: "Solicitud mal formada o sintáxis inválida", 
                commonUse: "Datos de entrada inválidos o faltantes", 
                example: "JSON malformado en API REST" 
            },
            { 
                code: 401, 
                description: "Unauthorized", 
                category: "client error", 
                meaning: "Autenticación requerida pero no proporcionada", 
                commonUse: "Acceso a recursos protegidos sin credenciales", 
                example: "Token de acceso inválido o expirado" 
            },
            { 
                code: 403, 
                description: "Forbidden", 
                category: "client error", 
                meaning: "Servidor entiende la solicitud pero se niega a autorizarla", 
                commonUse: "Permisos insuficientes para el recurso", 
                example: "Usuario regular intentando acceder a panel de administración" 
            },
            { 
                code: 404, 
                description: "Not Found", 
                category: "client error", 
                meaning: "Recurso solicitado no existe en el servidor", 
                commonUse: "URLs incorrectas, rotas o recursos eliminados", 
                example: "Página web que ya no existe o URL mal escrita" 
            },
            { 
                code: 405, 
                description: "Method Not Allowed", 
                category: "client error", 
                meaning: "Método HTTP no permitido para el recurso", 
                commonUse: "Usar POST en endpoint que solo acepta GET", 
                example: "Enviar POST a endpoint de solo lectura" 
            },
            { 
                code: 408, 
                description: "Request Timeout", 
                category: "client error", 
                meaning: "Tiempo de espera agotado por inactividad del cliente", 
                commonUse: "Cliente no completó la solicitud en tiempo esperado", 
                example: "Navegador tarda demasiado en enviar datos del formulario" 
            },
            { 
                code: 409, 
                description: "Conflict", 
                category: "client error", 
                meaning: "Conflicto con el estado actual del recurso", 
                commonUse: "Ediciones simultáneas o violación de restricciones", 
                example: "Dos usuarios editando el mismo documento simultáneamente" 
            },
            { 
                code: 413, 
                description: "Payload Too Large", 
                category: "client error", 
                meaning: "Carga útil excede límites del servidor", 
                commonUse: "Archivos muy grandes o datos excesivos", 
                example: "Subir archivo de 1GB a servidor con límite de 100MB" 
            },
            { 
                code: 414, 
                description: "URI Too Long", 
                category: "client error", 
                meaning: "URL excede longitud permitida por el servidor", 
                commonUse: "URLs con demasiados parámetros de consulta", 
                example: "URL con más de 2000 caracteres" 
            },
            { 
                code: 418, 
                description: "I'm a teapot", 
                category: "client error", 
                meaning: "Soy una tetera (broma del April Fools' de 1998)", 
                commonUse: "Respuesta humorística para solicitudes inapropiadas", 
                example: "Solicitar a una tetera que prepare café" 
            },
            { 
                code: 429, 
                description: "Too Many Requests", 
                category: "client error", 
                meaning: "Usuario ha enviado demasiadas solicitudes en poco tiempo", 
                commonUse: "Rate limiting y protección contra ataques", 
                example: "Límite de 1000 requests por hora a API excedido" 
            },
            { 
                code: 500, 
                description: "Internal Server Error", 
                category: "server error", 
                meaning: "Error genérico del servidor cuando no hay mensaje más específico", 
                commonUse: "Errores inesperados en el código del servidor", 
                example: "Base de datos caída o error de programación" 
            },
            { 
                code: 502, 
                description: "Bad Gateway", 
                category: "server error", 
                meaning: "Respuesta inválida recibida de servidor upstream", 
                commonUse: "Proxies, load balancers y gateways", 
                example: "Servidor backend no responde o devuelve error" 
            },
            { 
                code: 503, 
                description: "Service Unavailable", 
                category: "server error", 
                meaning: "Servicio temporalmente no disponible por sobrecarga o mantenimiento", 
                commonUse: "Mantenimiento programado o demasiado tráfico", 
                example: "Sitio web en mantenimiento programado" 
            },
            { 
                code: 504, 
                description: "Gateway Timeout", 
                category: "server error", 
                meaning: "Tiempo de espera agotado esperando respuesta de servidor upstream", 
                commonUse: "Proxies y gateways esperando respuesta", 
                example: "Servidor backend tarda más de 30 segundos en responder" 
            }
        ];
        
        allStatusCodes = statusCodes;
        return statusCodes;
    };

    const findStatusCode = (searchTerm) => {
        return allStatusCodes.find(status => 
            status.code.toString() === searchTerm.toString() ||
            status.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getStatusCodeByIndex = (index) => {
        return allStatusCodes[index];
    };

    const clearStatusData = () => {
        elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.default}" alt="Gato HTTP por defecto">`;
        elements.characterNameResult.textContent = "";
        elements.characterHouse.innerHTML = "";
        elements.characterActor.textContent = "";
        elements.characterNickname.textContent = "-";
        elements.characterBirthdate.textContent = "-";
        elements.characterChildren.textContent = "-";
        elements.characterId.value = "0";
    };

    const displayStatusCode = async (status) => {
        if (!status) {
            elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.notFound}" alt="Código no encontrado">`;
            elements.characterNameResult.textContent = "¡Código HTTP no encontrado!";
            elements.characterHouse.innerHTML = "";
            elements.characterActor.textContent = "";
            elements.characterNickname.textContent = "-";
            elements.characterBirthdate.textContent = "-";
            elements.characterChildren.textContent = "-";
            return;
        }

        // Usar directamente la URL de la imagen sin fetch - ESTA ES LA SOLUCIÓN
        const imageUrl = `${apiUrl}/${status.code}`;
        
        // Crear imagen y manejar errores de carga
        const img = new Image();
        img.onload = function() {
            elements.characterDisplay.innerHTML = `<img class="character-img" src="${imageUrl}" alt="HTTP ${status.code}">`;
        };
        img.onerror = function() {
            elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.default}" alt="Imagen no disponible">`;
        };
        img.src = imageUrl;


        elements.characterNameResult.textContent = `${status.code} - ${status.description}`;
        elements.characterId.value = currentIndex;


        const categoryClass = statusCategories[status.category] || "unknown";
        elements.characterHouse.innerHTML = status.category ? 
            `<span class="house-badge ${categoryClass}">${status.category.toUpperCase()}</span>` : 
            "<span class='house-badge unknown'>DESCONOCIDO</span>";


    elements.characterNickname.textContent = status.meaning || "-";
    elements.characterBirthdate.textContent = status.example || "-";
    elements.characterChildren.textContent = status.description || "-";
    };

    const searchStatusCode = async (searchTerm) => {
        if (!searchTerm || searchTerm.trim().length === 0) {
            Swal.fire({
                title: "Error",
                text: "Ingresa un código HTTP (100-599) o descripción",
                icon: "warning",
                confirmButtonText: "Continuar"
            });
            return;
        }
        
        setLoading();
        
        if (allStatusCodes.length === 0) {
            await getAllStatusCodes();
        }

        const status = findStatusCode(searchTerm);
        
        if (status) {
            currentIndex = allStatusCodes.indexOf(status);
            await displayStatusCode(status);
        } else {
            await displayStatusCode(null);
        }
        
        setLoadingComplete();
    };

    const navigateStatus = async (direction) => {
        if (allStatusCodes.length === 0) return;
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % allStatusCodes.length;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : allStatusCodes.length - 1;
        }
        
        const status = getStatusCodeByIndex(currentIndex);
        await displayStatusCode(status);
        statusInput.value = "";
    };

    const initializeApp = async () => {
        setLoading();
        await getAllStatusCodes();
        
        clearStatusData();
        
        setLoadingComplete();

        // Eventos
        buttons.search.onclick = () => searchStatusCode(statusInput.value);
        
        statusInput.onkeyup = (event) => {
            if (event.key === "Enter") {
                searchStatusCode(statusInput.value);
            }
        };

        buttons.next.onclick = () => navigateStatus('next');
        buttons.prev.onclick = () => navigateStatus('prev');
    };

    initializeApp();
};

window.onload = httpCatsApi;