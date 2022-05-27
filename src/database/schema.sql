-- drop table if exists dindin_users, dindin_categories, dindin_transactions;

create table dindin_users (
	id serial primary key,
  	name text not null,
  	email text not null unique,
  	password text not null
)

create table dindin_categories (
	id serial primary key,
  	description text
)

create table dindin_transactions (
	id serial primary key,
  	type text not null,
  	description text,
  	value integer not null,
  	date timestamp not null,
  	dindin_user_id integer not null,
  	dindin_category_id integer not null,
  	foreign key (dindin_user_id) references dindin_users(id),
  	foreign key (dindin_category_id) references dindin_categories(id)
)

insert into dindin_categories (description) values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')