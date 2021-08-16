<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{$csrf_token}}">
        <meta name=layout content={{$layoutID}}>
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
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layoutCreator.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layout.js' defer></script>
    </head>
    <body>
        Autore: {{$username}} <br>
        Layout: {{$layoutID}}
        @if(isset($modify))
        <button id=modifica>Modifica</button>
        <button id=content>Content</button>
        @endif
    </body>
</html>