R Notebook
================

# 🏋 ex0 R Basics

This is an [R Markdown](http://rmarkdown.rstudio.com) Notebook. When you
execute code within the notebook, the results appear beneath the code.

Try executing this chunk by clicking the *Run* button within the chunk
or by placing your cursor inside it and pressing *Cmd+Shift+Enter*.

``` r
plot(cars)
```

![](ex0-R-basics_files/figure-gfm/unnamed-chunk-1-1.png)<!-- -->

Add a new chunk by clicking the *Insert Chunk* button on the toolbar or
by pressing *Cmd+Option+I*.

When you save the notebook, an HTML file containing the code and output
will be saved alongside it (click the *Preview* button or press
*Cmd+Shift+K* to preview the HTML file).

The preview shows you a rendered HTML copy of the contents of the
editor. Consequently, unlike *Knit*, *Preview* does not run any R code
chunks. Instead, the output of the chunk when it was last run in the
editor is displayed.

# 🚀 Basics commands

Getting help:

``` r
help('list')  #help for list
?list  #prints code documentation for lists
```

Printing to the console:

``` r
paste("Hello ", "R", "!")
```

    ## [1] "Hello  R !"

# R as a calculator

``` r
2 * 15 + 10
```

    ## [1] 40

``` r
x <- 2 * 15 + 10
```

# Functions

NB: in notebooks most R code consists in function calls on objects
loaded from libraries.

The following declares a function f taking x as argument and invokes f
with x = 2:

``` r
f <- function(x) {
    return (x * x)
}
f(2)
```

    ## [1] 4

# Basic types data structures

``` r
s1 <- 'Hello'  #a string
s2 <- " R!"  #another string 
s3 <- ' R
is fun'  #a multiline string
a <- 1  #int
b <- 2.0  #float
c <- TRUE  #boolean true
d <- FALSE  #boolean false

paste(s1, s2, s3)
```

    ## [1] "Hello  R!  R\nis fun"

``` r
paste('a =', a)
```

    ## [1] "a = 1"

``` r
paste('b is equal to', b, 'c and d are booleans equal to', c, 'and', d)
```

    ## [1] "b is equal to 2 c and d are booleans equal to TRUE and FALSE"

``` r
myvec <- c(1, 2.0, "3", '3', TRUE, FALSE)  #a vector

paste('myvector is', myvec)
```

    ## [1] "myvector is 1"     "myvector is 2"     "myvector is 3"    
    ## [4] "myvector is 3"     "myvector is TRUE"  "myvector is FALSE"

``` r
myvec[1]  #indices start at 1!
```

    ## [1] "1"

# Packages

Packages provide functionality, i.e., the ggplot2 package provides
datasets and statistical graphing with a layered grammar

``` r
data(package = "ggplot2")  #list datasets in ggplot2 package
```

``` r
library("ggplot2")  #load package
df <- mpg  #set dataframe from mpg dataset contained in ggplot2 package
head(df)  #print top rows in df
```

    ## # A tibble: 6 × 11
    ##   manufacturer model displ  year   cyl trans      drv     cty   hwy fl    class 
    ##   <chr>        <chr> <dbl> <int> <int> <chr>      <chr> <int> <int> <chr> <chr> 
    ## 1 audi         a4      1.8  1999     4 auto(l5)   f        18    29 p     compa…
    ## 2 audi         a4      1.8  1999     4 manual(m5) f        21    29 p     compa…
    ## 3 audi         a4      2    2008     4 manual(m6) f        20    31 p     compa…
    ## 4 audi         a4      2    2008     4 auto(av)   f        21    30 p     compa…
    ## 5 audi         a4      2.8  1999     6 auto(l5)   f        16    26 p     compa…
    ## 6 audi         a4      2.8  1999     6 manual(m5) f        18    26 p     compa…

# Loading CSV

``` r
df <- read.csv("data/heart-decease-cleveland.csv") #filename from Files > Upload
head(df)  #print top rows in df
```

    ##   age sex cp trestbps chol fbs restecg thalach exang oldpeak slope  ca thal num
    ## 1  63   1  1      145  233   1       2     150     0     2.3     3 0.0  6.0   0
    ## 2  67   1  4      160  286   0       2     108     1     1.5     2 3.0  3.0   2
    ## 3  67   1  4      120  229   0       2     129     1     2.6     2 2.0  7.0   1
    ## 4  37   1  3      130  250   0       0     187     0     3.5     3 0.0  3.0   0
    ## 5  41   0  2      130  204   0       2     172     0     1.4     1 0.0  3.0   0
    ## 6  56   1  2      120  236   0       0     178     0     0.8     1 0.0  3.0   0

# R dataframes

R dataframes are similar to a vector, ordered inhomogeneous with same
number of rows.

``` r
?data.frame
```

## Factors

Factors are used in dataframes for ‘category’ and ‘enumerated type’.

``` r
?factor
factors <- as.factor(c("C", "A", "C", "A", "B", "A", "B", "A", "B", "B"))
factors
```

    ##  [1] C A C A B A B A B B
    ## Levels: A B C

## Dataframe example 1

Dataframe from a vector of strings

``` r
L <- LETTERS[1:5]
L
```

    ## [1] "A" "B" "C" "D" "E"

``` r
fac <- sample(L, 10, replace = TRUE)  #factors
fac
```

    ##  [1] "D" "D" "C" "C" "B" "D" "D" "D" "C" "A"

``` r
d <- data.frame(x = 1, y = 1:10, fac = fac)
d
```

    ##    x  y fac
    ## 1  1  1   D
    ## 2  1  2   D
    ## 3  1  3   C
    ## 4  1  4   C
    ## 5  1  5   B
    ## 6  1  6   D
    ## 7  1  7   D
    ## 8  1  8   D
    ## 9  1  9   C
    ## 10 1 10   A

## Dataframe example 2

Dataframe from a vector of numbers

``` r
l <- c(1, 2, 3, 4, 5)  #create vector
l
```

    ## [1] 1 2 3 4 5

``` r
df <- data.frame(l)  #create dataframe
df
```

    ##   l
    ## 1 1
    ## 2 2
    ## 3 3
    ## 4 4
    ## 5 5

## Dataframe example 3

Create a dataframe with typed and named columns.

``` r
#create a dataframe
df <- data.frame(
    'A' = c(1,2,3,4,5,6),
    'B' = as.Date('20130102', format='%Y%m%d'),
    'C' = c("one", "two", "three", "four", "five", "six"),
    'D' = c('foo'),
    'E' = as.factor(c('male', 'female', 'female', 'female', 'male', 'female')))

sapply(df, class)  #print columns types or see in Environment
```

    ##           A           B           C           D           E 
    ##   "numeric"      "Date" "character" "character"    "factor"

Display dataframe information

``` r
head(df)  #display first 6 rows
```

    ##   A          B     C   D      E
    ## 1 1 2013-01-02   one foo   male
    ## 2 2 2013-01-02   two foo female
    ## 3 3 2013-01-02 three foo female
    ## 4 4 2013-01-02  four foo female
    ## 5 5 2013-01-02  five foo   male
    ## 6 6 2013-01-02   six foo female

``` r
tail(df)  #last 6 rows
```

    ##   A          B     C   D      E
    ## 1 1 2013-01-02   one foo   male
    ## 2 2 2013-01-02   two foo female
    ## 3 3 2013-01-02 three foo female
    ## 4 4 2013-01-02  four foo female
    ## 5 5 2013-01-02  five foo   male
    ## 6 6 2013-01-02   six foo female

``` r
colnames(df)  #list columns names
```

    ## [1] "A" "B" "C" "D" "E"

``` r
rownames(df)  #list row names
```

    ## [1] "1" "2" "3" "4" "5" "6"

Accessing dataframe elements

``` r
df$C  #access column 'C', this is the preferred way! Same as df['C']
```

    ## [1] "one"   "two"   "three" "four"  "five"  "six"

``` r
df[4]  #access column 4 (indices start at 1)
```

    ##     D
    ## 1 foo
    ## 2 foo
    ## 3 foo
    ## 4 foo
    ## 5 foo
    ## 6 foo

``` r
df[4, 3]  #access row 4, in column 3
```

    ## [1] "four"

``` r
#you can also access by index but that's rarely used
df[, 1:3]  #slice [rows, columns]
```

    ##   A          B     C
    ## 1 1 2013-01-02   one
    ## 2 2 2013-01-02   two
    ## 3 3 2013-01-02 three
    ## 4 4 2013-01-02  four
    ## 5 5 2013-01-02  five
    ## 6 6 2013-01-02   six

# Basic stats

## Summary statistics

``` r
df <- read.csv("data/heart-decease-cleveland.csv")
summary(df)
```

    ##       age             sex               cp           trestbps    
    ##  Min.   :29.00   Min.   :0.0000   Min.   :1.000   Min.   : 94.0  
    ##  1st Qu.:48.00   1st Qu.:0.0000   1st Qu.:3.000   1st Qu.:120.0  
    ##  Median :56.00   Median :1.0000   Median :3.000   Median :130.0  
    ##  Mean   :54.44   Mean   :0.6799   Mean   :3.158   Mean   :131.7  
    ##  3rd Qu.:61.00   3rd Qu.:1.0000   3rd Qu.:4.000   3rd Qu.:140.0  
    ##  Max.   :77.00   Max.   :1.0000   Max.   :4.000   Max.   :200.0  
    ##       chol            fbs            restecg          thalach     
    ##  Min.   :126.0   Min.   :0.0000   Min.   :0.0000   Min.   : 71.0  
    ##  1st Qu.:211.0   1st Qu.:0.0000   1st Qu.:0.0000   1st Qu.:133.5  
    ##  Median :241.0   Median :0.0000   Median :1.0000   Median :153.0  
    ##  Mean   :246.7   Mean   :0.1485   Mean   :0.9901   Mean   :149.6  
    ##  3rd Qu.:275.0   3rd Qu.:0.0000   3rd Qu.:2.0000   3rd Qu.:166.0  
    ##  Max.   :564.0   Max.   :1.0000   Max.   :2.0000   Max.   :202.0  
    ##      exang           oldpeak         slope            ca           
    ##  Min.   :0.0000   Min.   :0.00   Min.   :1.000   Length:303        
    ##  1st Qu.:0.0000   1st Qu.:0.00   1st Qu.:1.000   Class :character  
    ##  Median :0.0000   Median :0.80   Median :2.000   Mode  :character  
    ##  Mean   :0.3267   Mean   :1.04   Mean   :1.601                     
    ##  3rd Qu.:1.0000   3rd Qu.:1.60   3rd Qu.:2.000                     
    ##  Max.   :1.0000   Max.   :6.20   Max.   :3.000                     
    ##      thal                num        
    ##  Length:303         Min.   :0.0000  
    ##  Class :character   1st Qu.:0.0000  
    ##  Mode  :character   Median :0.0000  
    ##                     Mean   :0.9373  
    ##                     3rd Qu.:2.0000  
    ##                     Max.   :4.0000

## Frequency table

Here we use the `dplyr` package for data wrangling.

Here we use [R cut: Convert Numeric to
Factor](https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/cut)

See also dplyr functionality: - mutate: [Create, modify, and delete
columns](https://dplyr.tidyverse.org/reference/mutate.html) - group_by:
[Group by one or more
variables](https://dplyr.tidyverse.org/reference/group_by.html) -
summarise: [Summarise each group to fewer
rows](https://dplyr.tidyverse.org/reference/summarize.html) - filter:
[Subset rows using column
values](https://dplyr.tidyverse.org/reference/filter.html)

``` r
# install.packages("dplyr")  #run once to install
library("dplyr")  #load dplyr
```

    ## 
    ## Attaching package: 'dplyr'

    ## The following objects are masked from 'package:stats':
    ## 
    ##     filter, lag

    ## The following objects are masked from 'package:base':
    ## 
    ##     intersect, setdiff, setequal, union

``` r
value <- runif(n = 100, min = 0, max = 100)

df <- data.frame(value)

labels <- c('(0, 20]', '(20, 40]', '(40, 60]', '(60, 80]', '(80, 100]')
breaks <- c(0, 21, 41, 61, 81, 101)

df <- df %>%
  mutate(value_range = cut(value, breaks = breaks, labels = labels)) %>%
  group_by(value_range) %>%
  summarise(n = n(), .groups = 'drop') %>%
  filter(!is.na(value_range)) %>%
  mutate(rel_freq = n / nrow(.)) %>%
  mutate(cum_freq = cumsum(rel_freq))
df
```

    ## # A tibble: 5 × 4
    ##   value_range     n rel_freq cum_freq
    ##   <fct>       <int>    <dbl>    <dbl>
    ## 1 (0, 20]        21      4.2      4.2
    ## 2 (20, 40]       18      3.6      7.8
    ## 3 (40, 60]       22      4.4     12.2
    ## 4 (60, 80]       23      4.6     16.8
    ## 5 (80, 100]      16      3.2     20

------------------------------------------------------------------------

# Exercises

## 😜 Exercise 1

-   Create a dataframe for the values `0, 1, 1, 2, 2, 3, 4, 15`
-   Compute descriptive statistics
-   Count the number of cases with `count(df)` where `df` is your
    dataframe

``` r
library("dplyr")  #load dplyr for count
l <- c(0, 1, 1, 2, 2, 3, 4, 15)
df <- data.frame(l) 
summary(df)
```

    ##        l        
    ##  Min.   : 0.00  
    ##  1st Qu.: 1.00  
    ##  Median : 2.00  
    ##  Mean   : 3.50  
    ##  3rd Qu.: 3.25  
    ##  Max.   :15.00

``` r
count(df)
```

    ##   n
    ## 1 8

## 😜 Exercise 2

Using `heart-decease-switzerland.csv`: - Compute descriptive statistics
of all the variables - count the number of cases

``` r
df <- read.csv("data/heart-decease-switzerland.csv")
summary(df)
```

    ##       age             sex               cp           trestbps          chol  
    ##  Min.   :32.00   Min.   :0.0000   Min.   :1.000   Min.   : 80.0   Min.   :0  
    ##  1st Qu.:51.00   1st Qu.:1.0000   1st Qu.:4.000   1st Qu.:115.0   1st Qu.:0  
    ##  Median :56.00   Median :1.0000   Median :4.000   Median :125.0   Median :0  
    ##  Mean   :55.32   Mean   :0.9187   Mean   :3.699   Mean   :130.2   Mean   :0  
    ##  3rd Qu.:61.50   3rd Qu.:1.0000   3rd Qu.:4.000   3rd Qu.:145.0   3rd Qu.:0  
    ##  Max.   :74.00   Max.   :1.0000   Max.   :4.000   Max.   :200.0   Max.   :0  
    ##                                                   NA's   :2                  
    ##       fbs            restecg          thalach          exang       
    ##  Min.   :0.0000   Min.   :0.0000   Min.   : 60.0   Min.   :0.0000  
    ##  1st Qu.:0.0000   1st Qu.:0.0000   1st Qu.:104.2   1st Qu.:0.0000  
    ##  Median :0.0000   Median :0.0000   Median :121.0   Median :0.0000  
    ##  Mean   :0.1042   Mean   :0.3607   Mean   :121.6   Mean   :0.4426  
    ##  3rd Qu.:0.0000   3rd Qu.:1.0000   3rd Qu.:140.0   3rd Qu.:1.0000  
    ##  Max.   :1.0000   Max.   :2.0000   Max.   :182.0   Max.   :1.0000  
    ##  NA's   :75       NA's   :1        NA's   :1       NA's   :1       
    ##     oldpeak            slope             ca           thal      
    ##  Min.   :-2.6000   Min.   :1.000   Min.   :1.0   Min.   :3.000  
    ##  1st Qu.: 0.0000   1st Qu.:1.000   1st Qu.:1.0   1st Qu.:3.000  
    ##  Median : 0.3000   Median :2.000   Median :2.0   Median :7.000  
    ##  Mean   : 0.6538   Mean   :1.802   Mean   :1.6   Mean   :5.789  
    ##  3rd Qu.: 1.5000   3rd Qu.:2.000   3rd Qu.:2.0   3rd Qu.:7.000  
    ##  Max.   : 3.7000   Max.   :3.000   Max.   :2.0   Max.   :7.000  
    ##  NA's   :6         NA's   :17      NA's   :118   NA's   :52     
    ##       num       
    ##  Min.   :0.000  
    ##  1st Qu.:1.000  
    ##  Median :2.000  
    ##  Mean   :1.805  
    ##  3rd Qu.:3.000  
    ##  Max.   :4.000  
    ## 

## 🤔 Exercise 3

WIth the data in `heart-decease-switzerland.csv`: - Create a frequency
table of the `chol` variable for the frequency ranges:

    (120, 160]
    (160, 200]
    (200, 240]
    (240, 280]
    (280, 320]
    (320, 360]
    (360, 400]
    (400, 440]

``` r
library("dplyr")  #load dplyr

df <- read.csv("data/heart-decease-cleveland.csv")
labels <- c('(120, 160]',
'(160, 200]',
'(200, 240]',
'(240, 280]',
'(280, 320]',
'(320, 360]',
'(360, 400]',
'(400, 440]')

breaks <- c(120, 161, 201, 241, 281, 321, 361, 401, 441)

df <- df %>%
  mutate(value_range = cut(chol, breaks = breaks, labels = labels)) %>%
  group_by(value_range) %>%
  summarise(n = n(), .groups = 'drop') %>%
  filter(!is.na(value_range)) %>%
  mutate(rel_freq = n / nrow(.)) %>%
  mutate(cum_freq = cumsum(rel_freq))
df
```

    ## # A tibble: 8 × 4
    ##   value_range     n rel_freq cum_freq
    ##   <fct>       <int>    <dbl>    <dbl>
    ## 1 (120, 160]      7    0.875    0.875
    ## 2 (160, 200]     46    5.75     6.62 
    ## 3 (200, 240]     99   12.4     19    
    ## 4 (240, 280]     81   10.1     29.1  
    ## 5 (280, 320]     50    6.25    35.4  
    ## 6 (320, 360]     15    1.88    37.2  
    ## 7 (360, 400]      1    0.125   37.4  
    ## 8 (400, 440]      3    0.375   37.8

## 😜 Exercise 4

Render and submit your work.

-   Click `Knit` in toolbar
-   Commit `ex1-R-basics.md` and `ex1-R-basics_files/*` (you can use the
    Git tab in RStudio)
-   Push
-   Go to GitHub and check that `ex1-R-basics.md` is rendered
