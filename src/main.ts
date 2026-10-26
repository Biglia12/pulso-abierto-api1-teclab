
interface PrecioCripto {
    usd: number;
}

interface RespuestaAPI {
    bitcoin?: PrecioCripto;
    ethereum?: PrecioCripto;
    solana?: PrecioCripto;
}

const API_URL =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

async function consultarPrecios(): Promise<RespuestaAPI> {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error('No se pudieron obtener los precios.');
    }

    const datos: unknown = await respuesta.json();

    if (typeof datos !== 'object' || datos === null) {
        throw new Error('La API devolvió datos inválidos.');
    }

    const objeto = datos as Record<string, unknown>;
    const resultado: RespuestaAPI = {};

    for (const moneda of ['bitcoin', 'ethereum', 'solana'] as const) {
        const valor = objeto[moneda];

        if (typeof valor === 'object' && valor !== null) {
            const precio = (valor as Record<string, unknown>).usd;

            if (typeof precio === 'number' && Number.isFinite(precio)) {
                resultado[moneda] = { usd: precio };
            }
        }
    }

    return resultado;
}

console.log('Función para consultar precios preparada');

const botonReintentar = document.querySelector<HTMLButtonElement>('#btn-reintentar');
const formulario = document.querySelector<HTMLFormElement>('#form-consulta');
const boton = document.querySelector<HTMLButtonElement>('#btn-consultar');
const estado = document.querySelector<HTMLElement>('#estado');
const resultados = document.querySelector<HTMLElement>('#resultados');

if (formulario && boton && estado && resultados && botonReintentar) {
    botonReintentar.addEventListener('click', () => {
        formulario.requestSubmit();
    });
    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        boton.disabled = true;
        botonReintentar.hidden = true;
        estado.textContent = 'Cargando precios...';
        resultados.replaceChildren();

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // para comprobar la carga
            const datos = await consultarPrecios();
            //datos.bitcoin = undefined; para ver errores
            //datos.ethereum = undefined;
            //datos.solana = undefined;

            const monedas = [
                { nombre: 'Bitcoin', precio: datos.bitcoin?.usd },
                { nombre: 'Ethereum', precio: datos.ethereum?.usd },
                { nombre: 'Solana', precio: datos.solana?.usd },
            ];

            const disponibles = monedas.filter(
                (moneda) => moneda.precio !== undefined
            );

            if (disponibles.length === 0) {
                estado.textContent = 'No se encontraron resultados.';
                return;
            }

            disponibles.forEach((moneda) => {
                const tarjeta = document.createElement('article');
                tarjeta.className = 'tarjeta';

                const titulo = document.createElement('h3');
                titulo.textContent = moneda.nombre;

                const precio = document.createElement('p');
                precio.textContent = `${moneda.precio?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })} USD`;

                tarjeta.append(titulo, precio);
                resultados.appendChild(tarjeta);
            });

            estado.textContent = 'Consulta realizada correctamente.';
        } catch {
            estado.textContent = 'Ocurrió un error al consultar los precios.';
            botonReintentar.hidden = false;
        } finally {
            boton.disabled = false;
        }
    });
}

