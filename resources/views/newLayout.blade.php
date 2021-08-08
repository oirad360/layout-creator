<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href='/{{$app_folder}}/public/styles/newLayout.css'>
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layoutCreator.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/newLayout.js' defer></script>
        <style>
            form{
                display: flex;
                flex-direction: column;
            }
            label{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 3px;
            }
            label input{
                width: 20%;
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{$csrf_token}}">
    </head>
    <body>
        <main data-layout={{$layoutID}}>
            
        </main>
    </body>
</html>