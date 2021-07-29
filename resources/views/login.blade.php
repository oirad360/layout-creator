<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel='stylesheet' href='/{{$app_folder}}/public/styles/form.css'>
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/login.js' defer></script>
    </head>
    <body>
        <form name="form" method='POST'>
            <input type='hidden' name='_token' value='{{ $csrf_token }}'>
            <label>Username <br> o email <input name="user" type="text" value='{{ $old_user }}'></label>
            <span id="user" class="error hidden">Questo campo è obbligatorio</span>
            <label>Password <input name="password" type="password"/></label>
            <span id="password" class="error hidden">Questo campo è obbligatorio</span>
            <span id="compila" class="error hidden">Compila tutti i campi</span>
            <span id="errorLogin" class="hidden">Credenziali non valide</span>
            <label><input type="submit"/></label>
            <p>Non ti sei ancora registrato? <a href="/{{$app_folder}}/public/signup">Clicca qui.</a></p>
            <p id="errorphp">
                @if(isset($error))
                    {{ $error }}
                @endif
            </p>
        </form>
    </body>
</html>