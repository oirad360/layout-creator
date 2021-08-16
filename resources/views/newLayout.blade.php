<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href='/{{$app_folder}}/public/styles/newLayout.css'>
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layoutCreator.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/newLayout.js' defer></script>
        <style>
            #layoutMenu{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            #layoutMenu form{
                display: flex;
                flex-direction: column;
                align-items:flex-start;
            }
            #layoutMenu label{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 3px;
            }
            #layoutMenu label input{
                width: 20%;
            }
            #layoutMenu label.hidden{
                display:none;
            }
            .hidden{
                display: none;
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{$csrf_token}}">
        @if(isset($logged))
        <meta name="logged" content="true">
        @endif
    </head>
    <body>
        <section id="layout">
        </section>
        <button id=content>Inserisci prodotto</button>
        <section id="products">
        </section>
    </body>
</html>