<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href='/{{$app_folder}}/public/styles/newLayout.css'>
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/newLayout.js' defer></script>
    </head>
    <body>
        <main>
            
        </main>
        <menu>
            <button id="save" class="hidden">Salva</button>
            <div>Contatore: <span id=counter></span></div>
            <button id="level" class="hidden">Seleziona livello superiore</button>
            <button id="delete" class="hidden">Svuota sezione</button>
            <form name=layout>
                <input type='hidden' name='_token' value='{{ $csrf_token }}'>
                <div id="size" class="hidden">
                    <label id=width >Modifica larghezza (%):<input name=width type="number"></label>
                    <label id=height >Modifica altezza (%):<input name=height type="number"></label>
                    <label id=top >Modifica margine sup (px):<input name=marginTop type="number"></label>
                    <label id=right >Modifica margine dx (px):<input name=marginRight type="number"></label>
                    <label id=bottom >Modifica margine inf (px):<input name=marginBottom type="number"></label>
                    <label id=left >Modifica margine sx (px):<input name=marginLeft type="number"></label>
                </div>
                <div id="split">
                    <label>Numero di suddivisioni: <input name=numSplit type="number" min=2 value=2></label>
                    <label>Disponi in direzione
                        <select name=flexDirection>
                            <option value=row>orizzontale</option>
                            <option value=column>verticale</option>
                        </select>
                    </label>
                    <input value=Dividi type="submit">
                </div>
            </form>
        </menu>
        
    </body>
</html>