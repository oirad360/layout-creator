<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href='/provaTesi/public/styles/vetrina.css'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src='/{{$app_folder}}/public/scripts/env.js' defer></script>
        <script src='/{{$app_folder}}/public/scripts/vetrina.js' defer></script>
    </head>
    <body>
        <main data-username={{$username}}>
            <h1>Pagina di {{$username}}</h1>
            <div class=row data-id=row1>
                <section class=elem data-row=1 data-col=1>
                </section>
                <section class=elem data-row=1 data-col=2>
                </section>
                <section class=elem data-row=1 data-col=3>
                </section>
                <section class=elem data-row=1 data-col=4>
                </section>
            </div>
            <div class=row  data-id=row2>
                <section class=elem data-row=2 data-col=1>
                </section>
                <section class=elem data-row=2 data-col=2>
                </section>
                <section class=elem data-row=2 data-col=3>
                </section>
                <section class=elem data-row=2 data-col=4>
                </section>
            </div>
            <div class=row  data-id=row3>
                <section class=elem data-row=3 data-col=1>
                </section>
                <section class=elem data-row=3 data-col=2>
                </section>
                <section class=elem data-row=3 data-col=3>
                </section>
                <section class=elem data-row=3 data-col=4>
                </section>
            </div>
            <div class=row  data-id=row4>
                <section class=elem data-row=4 data-col=1>
                </section>
                <section class=elem data-row=4 data-col=2>
                </section>
                <section class=elem data-row=4 data-col=3>
                </section>
                <section class=elem data-row=4 data-col=4>
                </section>
            </div>
        </main>
    </body>
</html>