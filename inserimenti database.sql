create table users(
id integer primary key auto_increment,
nome varchar(255) not null,
cognome varchar(255) not null,
username varchar(16) not null unique,
email varchar(255) not null unique,
password varchar(255) not null
)engine = 'InnoDB';

create table layouts(
id integer primary key auto_increment,
user_id integer not null,
foreign key(user_id) references users(id) on update cascade,
index ind_user_id(user_id),
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

insert into users(nome,cognome,username,email,password) values('Dario','Anzalone','oirad360','darioanzalone@live.it','dario123');
insert into users(nome,cognome,username,email,password) values('Mario','Rossi','mario99','mariorossi@live.it','mario123');

