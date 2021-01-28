library(tidyverse)
library(ggplot2)

raw_data <- read_csv("yearly_estimates_state copy.csv")

raw_data$population_growth <- raw_data$'2020' - raw_data$'2010'

df <- state_df %>%
  rename(
    states = state
  )
 
#normailized growth rate
df$growth <- round((df$population_growth - mean(df$population_growth))
/sd(df$population_growth),1)

#postive or negative growth
df$growth_type <- ifelse(df$growth < 0, "above", "below")

#sort
df <- df[order(df$growth), ] 

#factor
df$`states` <- factor(df$`states`, levels = df$`states`)

df

ggplot(df, aes(x = growth, y = states, label=growth)) +
  geom_bar(stat= "identity", aes(fill= growth_type == "above"), width=.5) + 
  scale_fill_manual(name='Population',
                    breaks = c(TRUE,FALSE),
                    values = c("green", "red")) +
    labs(title = "Population change in American States 2010-2020")
  coord_flip()

?scale_fill_manual
  