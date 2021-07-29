create table users(
id integer primary key auto_increment,
nome varchar(255) not null,
cognome varchar(255) not null,
username varchar(16) not null unique,
email varchar(255) not null unique,
password varchar(255) not null,
propic varchar(255) not null,
dataRegistrazione timestamp default current_timestamp,
spesaTot integer default 0,
numCarrello integer default 0
)engine = 'InnoDB';

create table layouts(
id integer primary key auto_increment,
user_id integer not null,
foreign key(user_id) references users(id) on update cascade,
index ind_user_id(user_id),
row integer not null,
unique(user_id,row),
col1 json,
col2 json,
col3 json,
col4 json
)engine='InnoDB';

insert into users(nome,cognome,username,email,password,propic) values('Dario','Anzalone','oirad360','darioanzalone@live.it','dario123','propic');
insert into users(nome,cognome,username,email,password,propic) values('Mario','Rossi','mario99','mariorossi@live.it','mario123','propic');

insert into layouts(user_id,row,col1,col2,col3,col4) values(1,1,'{"height":"500px","width":"50%","margin":"5px","background-color":"#838383"}','{"height":"500px","width":"50%","margin":"5px","background-color":"#838383"}','{"height":"500px","width":"50%","margin":"5px","background-color":"#838383"}',NULL);
insert into layouts(user_id,row,col1,col2,col3,col4) values(1,2,'{"height":"200px","width":"100%","margin":"50px","background-color":"#838383"}',NULL,NULL,NULL);
insert into layouts(user_id,row,col1,col2,col3,col4) values(1,3,'{"height":"500px","width":"25%","margin":"5px","background-color":"#838383"}','{"height":"500px","width":"50%","margin":"5px","background-color":"#838383"}','{"height":"500px","width":"25%","margin":"5px","background-color":"#838383"}',NULL);

insert into layouts(user_id,row,col1,col2,col3,col4) values(2,1,'{"height":"500px","width":"25%","margin":"5px","background-color":"#838393"}','{"height":"500px","width":"75%","margin":"5px","background-color":"#838393"}',NULL,NULL);
insert into layouts(user_id,row,col1,col2,col3,col4) values(2,2,'{"height":"250px","width":"65%","margin":"5px","background-color":"#838393"}','{"height":"250px","width":"35%","margin":"5px","background-color":"#838393"}',NULL,NULL);

