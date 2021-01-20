CREATE TABLE offical_census_regional (
	id SERIAL PRIMARY KEY,
	Region Varchar,
	Census INT,
	Estimates_Base INT
);

CREATE TABLE offical_census_state(
	id SERIAL PRIMARY KEY,
	state VARCHAR,
	Census INT,
	Estimates_Base INT
);

CREATE TABLE yearly_estimates_regional(
id SERIAL PRIMARY KEY,
region VARCHAR,
"2010" INT,
"2011" INT,
"2012" INT,
"2013" INT,
"2014" INT,
"2015" INT,
"2016" INT,
"2017" INT,
"2018" INT,
"2019" INT,
"2020" INT
);

CREATE TABLE yearly_estimates_state(
id SERIAL PRIMARY KEY,
state VARCHAR,
"2010" INT,
"2011" INT,
"2012" INT,
"2013" INT,
"2014" INT,
"2015" INT,
"2016" INT,
"2017" INT,
"2018" INT,
"2019" INT,
"2020" INT
);