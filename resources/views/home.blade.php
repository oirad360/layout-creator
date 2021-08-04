<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/home.js' defer></script>
    </head>
    <body>
        <a href="/{{$app_folder}}/public/{{$status}}">{{$status}}</a> <br>
        @if(isset($username))
        Benvenuto {{$username}} <br>
        @endif
        <a href="/{{$app_folder}}/public/newLayout/new">Nuovo layout</a>
        <div id="layouts">
        </div>
    </body>
</html>