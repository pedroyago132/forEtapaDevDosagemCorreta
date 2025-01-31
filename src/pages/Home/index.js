import * as React from 'react';
import { Container, Input, Title, FormControl, Logo, SubTitle, Body, Container1, ImageBackground } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue, update } from "firebase/database";
import TextField from '@mui/material/TextField';
import base64 from 'base-64'
import { database } from '../../App';


const Home = () => {
    const [connected, setConnected] = React.useState(false);
    const [emailInput, setEmailInput] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [senhaInput, setSenha] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'right',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const navigate = useNavigate();

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    React.useEffect(() => {
        const db = getDatabase()
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                const dbRef = ref(db, `${base64.encode(user.email)}/isconnected`);
                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val();
                    setConnected(data)



                })
            }
        }
        )

    }, [])


    const goMeansure = () => {
        const db = getDatabase();
        if (!emailInput || !senhaInput) {
            window.alert('Insira os campos de usuário e senha')
        } else {
            const dbRef = ref(database, `${base64.encode(emailInput)}/isconnected`);

            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                console.log('ITEM1::::::::', data)
                if (!data.isConnected) {


                    const auth = getAuth();
                    signInWithEmailAndPassword(auth, emailInput, senhaInput)
                        .then((userCredential) => {
            
                             
                                const post = {
                                    isConnected: true,
                                };

                                const updates = {};
                                updates[`${base64.encode(emailInput)}/isconnected`] = post;

                               update(ref(db), updates).then(log => navigate('/measure')).catch(log => window.alert(log))

                        
            
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            window.alert('Verifique Usuário e senha')
                        });


                } else {


                }

            })

        }
    };

        return (
            <>
                <Body>
                    <Container>

                        <FormControl color='primary'  >
                            <Logo src='/Logo.png' alt='id' />
                            <Title>
                                Dosagem Correta
                            </Title>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Email"
                                multiline
                                fullWidth
                                maxRows={4}
                                variant='outlined'
                                placeholder='Insira seu Email'
                                onChange={text => setEmailInput(text.target.value)}
                            />

                            <TextField
                                id="outlined-multiline-flexibl1"
                                label="Senha"
                                fullWidth
                                multiline
                                maxRows={4}
                                variant='outlined'
                                placeholder='Senha'
                                onChange={text => setSenha(text.target.value)}

                            />
                            <Button style={{ alignSelf: 'center' }} onClick={() => goMeansure()} variant="contained">Entrar</Button>

                            <div style={{ display: 'flex', gap: 7 }} >
                                <SubTitle   >
                                    Ainda não tem uma conta?
                                </SubTitle>
                                <a style={{ fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }} onClick={() => navigate('/registro')} >
                                    Clique Aqui
                                </a>
                            </div>

                            <div style={{ display: 'flex', gap: 7 }} >
                                <SubTitle   >
                                    Esqueceu sua senha?
                                </SubTitle>
                                <a style={{ fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }} onClick={() => navigate('/password')} >
                                    Clique Aqui
                                </a>
                            </div>
                        </FormControl>


                    </Container>
                    <Container1>
                        <ImageBackground id='logoa' src='/medical.png' />
                    </Container1>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message="Erro ao efetuar Login"
                        key={vertical + horizontal}
                    />
                </Body>
            </>
        );
    

}

export default Home

