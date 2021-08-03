<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/layout.js' defer></script>
    </head>
    <body data-layout="{{$layoutID}}">
        Autore: {{$username}} <br>
        Layout: {{$layoutID}}
        <main id=layoutContainer>
            
        </main>
    </body>
</html>