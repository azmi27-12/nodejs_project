# nodejs_project


## Air Quality

## Funzionamento

Utilizzando postman è possibile provare l'api per compiere le principali operazioni CRUD. <br>

Per fare la segnalazione è necessario inserire il cap, la città e un immagine del posto da segnalare. Una volta caricata la foto la si ritrova nella cartella src/image <br>

Se si esegue uno dei comandi di delete le foto del posto da cancellare verranno cancellate dalla cartella. Stessa cosa se si effettua un operazione di update , la foto vecchia viene cancellata e sostituita da quella nuova.

![Scheme](https://github.com/azmi27-12/node_project/blob/main/screenshoot/operazioni.PNG)


### Per il funzionametno è necessario scaricare: express, dotenv-webpack, path, fs, mysql

