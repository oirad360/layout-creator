<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/home.js' defer></script>
    </head>
    <body data-username={{$username}}>
        <h1>Layouts di {{$username}}</h1>
        <div id="layouts">
        </div>
        <a href="/{{$app_folder}}/public/newLayout">Nuovo layout</a>
    </body>
</html>