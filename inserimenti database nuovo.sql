/***********************************DB LAYOUTS**************************************/
create table layouts(
id integer primary key auto_increment,
display varchar(255),
flexDirection varchar(255),
height varchar(255),
width varchar(255)
)engine='InnoDB';

create table childs(
id integer primary key auto_increment,
layout_id integer not null,
foreign key(layout_id) references layouts(id) on update cascade on delete cascade,
index ind_layout_id(layout_id),
data_gen integer not null,
data_id integer not null,
data_parent_gen integer not null,
data_parent_id integer not null,
hasChilds boolean not null,
title varchar(255),
fontSize varchar(255),
display varchar(255),
flexDirection varchar(255),
height varchar(255),
width varchar(255),
margin varchar(255)
)engine='InnoDB';

/*******************************DB SITO GENERICO************************************/
create table users(
id integer primary key auto_increment,
nome varchar(255) not null,
cognome varchar(255) not null,
username varchar(16) not null unique,
email varchar(255) not null unique,
password varchar(255) not null
)engine = 'InnoDB';

create table users_layouts(
layout_id integer primary key,
foreign key(layout_id) references layouts(id) on update cascade on delete cascade,
index ind_layout_id(layout_id),
user_id integer not null,
foreign key(user_id) references users(id) on update cascade on delete cascade,
index ind_user_id(user_id),
unique(user_id,layout_id)
)engine = 'InnoDB';

create table products(
id integer primary key auto_increment,
nome varchar(255),
prezzo integer,
immagine varchar(255)
)engine = 'InnoDB';

insert into products(nome,prezzo,immagine) values('iPhone12',819,'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000');
insert into products(nome,prezzo,immagine) values('PlayStation 5',499,'https://fagaelectronics.it/1160-large_default/sony-playstation-5.jpg');
