<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href='/{{$app_folder}}/public/styles/newLayout.css'>
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/newLayout.js' defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{$csrf_token}}">
    </head>
    <body>
        <main @if(isset($layoutID)) data-layout={{$layoutID}} @endif id=layoutContainer>
            
        </main>
        <menu>
            <button id="save" class="hidden">Salva</button>
            <button id="level" class="hidden">Seleziona livello superiore</button>
            <button id="delete" class="hidden">Svuota sezione</button>
            <form name=layout>
                <div>Contatore: <span id=counter></span></div>
                <div id="size" class="hidden">
                    <label>Modifica larghezza (%):<input min=0 name=width type="number" step="any"></label>
                    <label>Modifica altezza (%):<input min=0 name=height type="number" step="any"></label>
                    <label>Modifica margine sup (px):<input name=marginTop type="number"></label>
                    <label>Modifica margine dx (px):<input name=marginRight type="number"></label>
                    <label>Modifica margine inf (px):<input name=marginBottom type="number"></label>
                    <label>Modifica margine sx (px):<input name=marginLeft type="number"></label>
                </div>
                <div id="split">
                    <label class="titleSetting hidden">Titolo: <input name=title></label>
                    <label class="titleSetting hidden">Font (px): <input name=fontSize type="number"></label>
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