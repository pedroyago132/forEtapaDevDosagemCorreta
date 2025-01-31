import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get,child } from "firebase/database";
import { Globalurl } from "../Globals/globals";

export function getClients() {
    const arrayClientes = []
    const dbRef = ref(getDatabase());
    get(child(dbRef, `clientes/`)).then((snapshot) => {
     
    }).catch((error) => {
      console.error(error);
    });

}

export async function sendMessageAll(body) {
  try {
    const response = await fetch(`${Globalurl}/send-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define que o conteúdo do corpo é JSON
        'Client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
      },
      body: JSON.stringify(body),
    });

    // Verifica se a resposta está OK
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json(); // Aguarda a conversão para JSON
    console.log('Success:', result);

    return result; // Retorna o resultado, se necessário
  } catch (error) {
    console.error('Error:', error);
    throw error; // Relança o erro, se você quiser tratá-lo fora dessa função
  }
}

export function createInstance(body) {
  fetch(`https://api.z-api.io/instances/integrator/on-demand`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define que o conteúdo do corpo é JSON
       'client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error));
}

export async function lerQRCode(idi, tokeni) {
  try {
    const response = await fetch(`https://api.z-api.io/instances/${idi}/token/${tokeni}/qr-code`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
      },
    });


    const result = await response.json();
    return result; // Retorna o resultado da chamada para quem chamou a função
  } catch (error) {
    console.error('Erro ao buscar o QR Code:', error);
    throw error; // Repassa o erro para que possa ser tratado por quem chamou
  }
}


export async function listingInstances(idi, tokeni) {
  try {
    const response = await fetch(`https://api.z-api.io/instances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Retorna o resultado da chamada para quem chamou a função
  } catch (error) {
    console.error('Erro ao buscar o QR Code:', error);
    throw error; // Repassa o erro para que possa ser tratado por quem chamou
  }
}


export async function dataInstance(idi, tokeni) {
  try {
    const response = await fetch(`https://api.z-api.io/instances/${idi}/token/${tokeni}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Retorna o resultado da chamada para quem chamou a função
  } catch (error) {
    console.error('Erro ao buscar o QR Code:', error);
    throw error; // Repassa o erro para que possa ser tratado por quem chamou
  }
}

export async function sendImage(bodyImage) {
  try {
    const response = await fetch(`${Globalurl}/send-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define que o conteúdo do corpo é JSON
        'Client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
      },
      body: JSON.stringify(bodyImage),
    });

    // Verifica se a resposta está OK
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json(); // Aguarda a conversão para JSON
    console.log('Success:', result);

    return result; // Retorna o resultado, se necessário
  } catch (error) {
    console.error('Error:', error);
    throw error; // Relança o erro, se você quiser tratá-lo fora dessa função
  }
}

export async function createClient(body) {
  const API_URL = 'https://api.abacatepay.com/v1/customer/create';
  const AUTH_TOKEN = 'abc_dev_HSqTWMnYzmneM4d2KC1ZdmGt';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', // Configuração para ignorar CORS
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    // Verifica se a resposta não é bem-sucedida

    const result = await response.json(); // Converte a resposta para JSON
    console.log('Sucesso:', result);
    return result; // Retorna o resultado
  } catch (error) {
    console.error('Erro ao criar cliente:', error.message);
    throw error; // Relança o erro para tratamento externo
  }
}
