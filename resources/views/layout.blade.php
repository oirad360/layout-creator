<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layout.js' defer></script>
    </head>
    <body>
        Autore: {{$username}} <br>
        Layout: {{$layoutID}}
        @if(isset($modify))
        <a href='/{{$app_folder}}/public/newLayout/{{$layoutID}}'>Modifica</a>
        @endif
        <main data-layout="{{$layoutID}}" id=layoutContainer>
            
        </main>
    </body>
</html>