const { createBot, createProvider, createFlow, addKeyword, addChild } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowExit = addKeyword(['salir', 'cancelar', 'no quiero', 'exit', 'adios', 'chau'])
.addAnswer(
    [
        'Gracias por escribirnos ☺️',
        'Recuerda que podemos empezar de nuevo con un: *Hola*',
        'Estaremos aqui para cualquier duda que tengas'
    ]
)

const flowAgradecimiento = addKeyword(['gracias', 'te lo agradezco', 'muchas gracias'])
.addAnswer('Gracias a ti, estamos para informarte sobre cualquier duda que tengas')
.addAnswer(
    [
        'Recuerda que puedes visitarnos en nuestra pagina web',
        'Haciendo click aqui 👉🏼 https://catalogozohar.com/wp/'
    ], null, null, [flowExit]
)

const flowAsesora = addKeyword(['asesora', 'persona real'])
.addAnswer(
    [
        'Ahora te estare transfiriendo con tu asesora personal',
        'En unos momentos ella te respondera ☺️',
        '*Zohar Bot* se despide 👋🏼'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowInscripcion = addKeyword('inscripción', 'inscripcion', 'ingreso')
.addAnswer('Excelente decision 😉')
.addAnswer(
    [
        'Nuestra empresa es 100% peruana 🇵🇪', 
        'Veo que estás interesada, favor indicarme sus datos para inscribirla totalmente gratis y sin obligaciones 🤗',
        '✅ DNI:',
        '✅ Nombres y Apellidos:',
        '✅ RUC: (no indispensable)',
        '✅ Correo Electrónico:',
        '✅ Fecha de Nacimiento:',
        '✅ Departamento:',
        '✅ Provincia:',
        '✅ Distrito:',
        '✅ Dirección de Envió:',
        '✅ Punto de referencia:',
        '✅ Celular:'
    ]
)

const flowRealizarPedido = addKeyword(['pedido', 'pedidos'])
.addAnswer(
    [
        'Nosotros tenemos una plataforma virtual para que registren sus pedidos a nivel nacional; no obstante, esto está siendo actualizada por ello los pedidos lo pueden hacer por WhatsApp enviando captura de los productos de su interés precisándolo, su asesora lo registra en el sistema y le envía el detalle para su revisión y posterior pago.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowSerLider = addKeyword(['líder', 'lider'])
.addAnswer('Una líder debe tener como mínimo 5 empresarias, una de ellas puede ser la misma líder. Si en una misma campaña 5 empresarias compran a ZOHAR, la líder gana las comisiones de acuerdo con el Plan de Carrera.')
.addAnswer('Listo', {media: 'https://catalogozohar.com/pdf-catalogo/Plan_De_Carrera_2.jpg',})
.addAnswer(
    [
        'Aqui te envio el plan de carrera 🫡'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowVirtualidad = addKeyword(['virtual', 'virt'])
.addAnswer(
    [
        'Estuvimos trabajando con catálogo físico, pero por la coyuntura generada por la pandemia estamos trabajando con catálogo virtual hasta nuevo aviso, lo que hemos hecho es incrementar las ganancias',
        'Es decir si antes era desde 25% hasta 40%, ahora es desde 30% hasta 45% por la razón indicada.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowTiempoDemora = addKeyword(['tiempo', 'time', 'lapso'])
.addAnswer(
    [
        'Esto depende de su ubicación, en Lima en promedio demora 2 días, en provincia ciudad puede demorar desde 3 a 5 días desde que sale de nuestro almacén.',
        'En la selva puede demorar más y en general puede variar dependiendo la distancia y restricciones en el acceso en cada región.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowDevoluciones = addKeyword(['devolucion', 'devoluciones', 'devolución'])
.addAnswer(
    [
        'Solo en casos específicos, nuestra política de devolución se indica en el club ZOHAR. De haber un caso particular se podría hablar con la gerencia.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowCredito = addKeyword(['credito', 'creditos', 'crédito', 'créditos'])
.addAnswer(
    [
        'En esta etapa no damos crédito. Usted puede hacer su pedido y pagar en un plazo no mayor a tres días, luego del pago el sistema libera su pedido para que se realice el envío.',
        'Nuestra propuesta en general es mejor a otras empresas de venta por catálogo, le invito a comparar los precios, calidad y si dan descuentos en sus productos y regalos para sus clientes finales como nosotros, esto muy aparte de la mayor ganancia que obtiene con nosotros.',
        'Recuerde que usted solo paga lo que le cuesta; por ejemplo, si usted compra precio catálogo S/500, paga solo S/325 = 500-0.35x500, gana 35% (S/175) y otros beneficios.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowAdquisicionNumeros = addKeyword(['numeros', 'números', 'num'])
.addAnswer(
    [
        'Nuestra área comercial me brindó su número, se tiene una base de datos producto de las recomendaciones de las empresarias, líderes, directora y gerentes que trabajan con otras marcas.',
        'También de la publicidad que hacemos en cada catálogo donde surgen nuevas interesadas ☺️'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowFiabilidad = addKeyword(['fiablilidad', 'estafa'])
.addAnswer(
    [
        'Nuestra empresa es Corporación Ricvic SAC con RUC 20605500308, es propietaria de la marca ZOHAR (Certificado de INDECOPI N° P00272768).',
        'En internet puede investigar rápidamente sobre nuestra empresa, también puede ver:',
        'Nuestro Facebook: https://www.facebook.com/zoharcatalogo',
        'Nuestra Ubicacion: https://maps.app.goo.gl/1b3FEvNp4bnrR1XZA',
        'Nuestra Pagina Web: https://catalogozohar.com/wp/'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowTransporte = addKeyword(['transporte', 'trans'])
.addAnswer(
    [
        'Depende de la empresa transportista, dado que puede variar el costo y tiempo de envío.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowEnvios = addKeyword(['envios', 'envíos', 'env'])
.addAnswer(
    [
        'Nosotros trabajamos con operadores logísticos puerta a puerta (se envía hasta su casa) o empresas de transporte que tienen agencias en diferentes ciudades.',
        'Osea sí ☺️'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowPreguntasFrecuentes = addKeyword(['preguntas frecuentes', 'pf', 'preguntas'])
.addAnswer(
    [
        'Tenemos tantas preguntas frecuentes 🙂'
    ], null, null, [flowAgradecimiento, flowExit]
)
.addAnswer(
    [
        '¿Quieres saber sobre los envios?',
        '👉🏼 Escribe: *Envíos*',
        '¿Quieres saber sobre como se envian los pedidos?',
        '👉🏼 Escribe: *Transporte*',
        '¿Quieres saber sobre la confiabilidad de la empresa?',
        '👉🏼 Escribe: *Fiabilidad*',
        '¿Quieres saber como obtenemos los numeros?',
        '👉🏼 Escribe: *Numeros*',
        '¿Quieres saber si damos credito?',
        '👉🏼 Escribe: *Credito*',
        '¿Quieres saber sobre nuestra politica de devoluciones?',
        '👉🏼 Escribe: *Devoluciones*',
        '¿Quieres saber sobre el tiempo de demora en entrega?',
        '👉🏼 Escribe: *Tiempo*',
        '¿Quieres saber sobre la virtualidad de la empresa?',
        '👉🏼 Escribe: *Virtual*',
        '¿Quieres saber sobre como ser una líder?',
        '👉🏼 Escribe: *Líder*',
        '¿Quieres saber como pasar su pedido?',
        '👉🏼 Escribe: *Pedido*'
    ], null, null, [flowEnvios, flowTransporte, flowFiabilidad, flowAdquisicionNumeros, flowCredito, flowDevoluciones, flowTiempoDemora, flowVirtualidad, flowSerLider, flowRealizarPedido, flowExit]
)

const flowCatAnterior = addKeyword(['anterior', 'catalogo anterior', 'catálogo anterior', 'campaña anterior'])
.addAnswer('Te estoy enviando el PDF del catalogo, en unos momentos llegara. Esto puede tomar unos minutos 😌')
.addAnswer('Listo', {media: 'https://catalogozohar.com/pdf-catalogo/Club%20ZOHAR%20C11-C12%202022.pdf',})
.addAnswer(
    [
        'Nos complace enviarte el Catalogo Anterior 😉'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowCatOferta = addKeyword(['oferta', 'catalogo oferta', 'catalogo de oferta', 'catálogo de oferta', 'catálogo oferta'])
.addAnswer('Te estoy enviando el PDF del catalogo, en unos momentos llegara. Esto puede tomar unos minutos 😌')
.addAnswer('Listo', {media: 'https://catalogozohar.com/pdf-catalogo/S%C3%9APER%20OFERTAS%20C02%202023.pdf',})
.addAnswer(
    [
        'Nos complace enviarte el Catalogo de Oferta 😉'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowCatNormal = addKeyword(['normal', 'campaña normal', 'catalogo normal', 'catálogo normal'])
.addAnswer('Te estoy enviando el PDF del catalogo, en unos momentos llegara. Esto puede tomar unos minutos 😌')
.addAnswer('Listo', {media: 'https://catalogozohar.com/pdf-catalogo/CAT%C3%81LOGO%20ZOHAR%20C3-C4%202023.pdf',})
.addAnswer(
    [
        'Nos complace enviarte el Catalogo Normal 😉'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowPDF = addKeyword(['catalogo', 'catálogo', 'pdf'])
.addAnswer(
    [
        '¿Que catálogo quieres que te envíe?',
        '👉🏼 Escribe *Normal* para enviarle la campaña Normal',
        '👉🏼 Escribe *Oferta* para enviarle la campaña de Oferta',
        '👉🏼 Escribe *Anterior* para enviarle la campaña Anterior'
    ], null, null, [flowCatNormal, flowCatOferta, flowCatAnterior, flowExit] 
)

const flowCatalogos = addKeyword(['catálogos', 'catalogos'])
.addAnswer(
    [
        'Nuestro catálogo cubre dos campañas y cada una dura 28 días.',
        'Le envío nuestro catálogo actual C05-C06 y el Club ZOHAR donde podrá ver todos los beneficios ofrecidos.',
        'Por ejemplo, si usted compra precio catálogo S/500, paga 500-0.35x500 = S/325, gana 35% (S/175) y otros beneficios.'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowUbicacion = addKeyword(['ubicación', 'ubicacion', 'ubi'])
.addAnswer(
    [
        'Nuestra base está en Lima y desde allí hacemos envíos a nivel nacional 😉'
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowSobreNosotros = addKeyword(['sobre nosotros', 'nosotros'])
.addAnswer(
    [
        'Nos caracterizamos por:',
        '✅ Ganancias desde 30% hasta 45%',
        '✅ Regalo de bienvenida',
        '✅ Premios por nivel de ventas',
        '✅ Sorteo por pedidos',
        '✅ Premio de consecutividad',
        '✅ Envío gratis (bajo consideraciones)',
        '✅ Precios de los productos más cómodos y con mayor calidad',
        '✅ Regalos para los clientes finales',
        '✅ Diferentes categorías (ropa, calzado, accesorios, casa hogar y otros)',
        '✅ Nuestro sistema de venta es al contado',
        '✅ Pedido mínimo S/ 150',
        '✅ La inscripción es gratis y no genera obligación alguna',
        '✅ Hacemos envíos por Courier y agencias de transporte',
    ], null, null, [flowAgradecimiento, flowExit]
)

const flowInformacion = addKeyword(['información', 'informacion', 'info'])
.addAnswer(
    [
        '¿Sobre que deseas informacion? 🤔',
        '¿Quieres saber quienes somos?',
        'Escribe: *Sobre Nosotros*',
        '¿Quieres sabes sobre nuestra ubicación?',
        'Escribe: *Ubicación*',
        '¿Quieres saber sobre nuestros catalogos?',
        'Escribe: *Catálogos*'
    ], null, null, [flowSobreNosotros, flowUbicacion, flowCatalogos, flowExit]   
)

const flowContinuar = addKeyword(['continuar', 'proceder', 'siguiente'])
.addAnswer(
    [
        'Recuerda que siempre puedes salir de este proceso 😰',
        'Escribiendo: *Salir*'
    ]
)
.addAnswer(
    [
        'Dividí mis funciones en 4 partes 😌',
        '- ¿Quieres informacion sobre nuestra empresa?',
        '👉🏼 Escribe: *Información*',
        '- ¿Quieres que te envie un catálogo?',
        '👉🏼 Escribe: *Catálogo*',
        '- ¿Quieres ver las preguntas frecuentes?',
        '👉🏼 Escribe: *Preguntas Frecuentes*',
        '- ¿Quieres formar parte de nuestra familia?',
        '👉🏼 Escribe: *Inscripción*'
    ], null, null, [flowInformacion, flowPDF, flowPreguntasFrecuentes, flowInscripcion, flowExit] 
)

const flowStart = addKeyword(['empezar', 'comienza', 'inicia'])
.addAnswer(
    [
        'Me presento...',
        'Soy el Bot de Zohar 🤖',
        'Diseñado para guiarte y resolver tus dudas 😉',
        'Que es lo que puedo hacer? Veamos...',
        'Puedo darte informacion sobre lo que necesitas'
    ]
)
.addAnswer(
    [
        'Te dare una lista de mis funciones 🫡',
        'Escribe: *Continuar*',
        '¿Ya no me necesitas? 😢',
        'Escribe: *Salir*'
    ], null, null, [flowContinuar, flowExit] 
)

const flowSaludo = addKeyword(['inicio', 'que empiece', 'dale', 'zohar', 'hola', 'que tal', 'buenas', 'buenos dias'])
.addAnswer(
    [
        'Hola, gracias por su interés en formar parte de nuestra familia *ZOHAR* 🤩🤑🤗',
        '¿Lista para iniciar?', 
        'Escriba: *Empezar*',
        '¿No deseas mas informacion?',
        'Escriba: *Salir*' 
    ], null, null, [flowStart, flowExit]     
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSaludo])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
