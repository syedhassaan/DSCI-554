R Notebook
================

# 🏋 ex1 R steam-and-leaf plot

Base R `stem {graphics}` is used to realize steam-and-leaf plots.

Read the docs with `?stem`

``` r
?stem
```

## Example 1: plot a vector

``` r
data = c(1, 3, 5, 10, 17, 17)
stem(data)
```

    ## 
    ##   The decimal point is 1 digit(s) to the right of the |
    ## 
    ##   0 | 13
    ##   0 | 5
    ##   1 | 0
    ##   1 | 77

## Example 2: plot areas of the World’s major landmasses

``` r
?islands  #A named vector of length 48.
names(islands)
```

    ##  [1] "Africa"           "Antarctica"       "Asia"             "Australia"       
    ##  [5] "Axel Heiberg"     "Baffin"           "Banks"            "Borneo"          
    ##  [9] "Britain"          "Celebes"          "Celon"            "Cuba"            
    ## [13] "Devon"            "Ellesmere"        "Europe"           "Greenland"       
    ## [17] "Hainan"           "Hispaniola"       "Hokkaido"         "Honshu"          
    ## [21] "Iceland"          "Ireland"          "Java"             "Kyushu"          
    ## [25] "Luzon"            "Madagascar"       "Melville"         "Mindanao"        
    ## [29] "Moluccas"         "New Britain"      "New Guinea"       "New Zealand (N)" 
    ## [33] "New Zealand (S)"  "Newfoundland"     "North America"    "Novaya Zemlya"   
    ## [37] "Prince of Wales"  "Sakhalin"         "South America"    "Southampton"     
    ## [41] "Spitsbergen"      "Sumatra"          "Taiwan"           "Tasmania"        
    ## [45] "Tierra del Fuego" "Timor"            "Vancouver"        "Victoria"

We can use [log: Logarithms and
Exponentials](https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/log)
to resize the data.

``` r
islands
```

    ##           Africa       Antarctica             Asia        Australia 
    ##            11506             5500            16988             2968 
    ##     Axel Heiberg           Baffin            Banks           Borneo 
    ##               16              184               23              280 
    ##          Britain          Celebes            Celon             Cuba 
    ##               84               73               25               43 
    ##            Devon        Ellesmere           Europe        Greenland 
    ##               21               82             3745              840 
    ##           Hainan       Hispaniola         Hokkaido           Honshu 
    ##               13               30               30               89 
    ##          Iceland          Ireland             Java           Kyushu 
    ##               40               33               49               14 
    ##            Luzon       Madagascar         Melville         Mindanao 
    ##               42              227               16               36 
    ##         Moluccas      New Britain       New Guinea  New Zealand (N) 
    ##               29               15              306               44 
    ##  New Zealand (S)     Newfoundland    North America    Novaya Zemlya 
    ##               58               43             9390               32 
    ##  Prince of Wales         Sakhalin    South America      Southampton 
    ##               13               29             6795               16 
    ##      Spitsbergen          Sumatra           Taiwan         Tasmania 
    ##               15              183               14               26 
    ## Tierra del Fuego            Timor        Vancouver         Victoria 
    ##               19               13               12               82

``` r
islands[1]  #index starts at 1!
```

    ## Africa 
    ##  11506

``` r
log10(islands[1])
```

    ##   Africa 
    ## 4.060924

``` r
stem(islands)
```

    ## 
    ##   The decimal point is 3 digit(s) to the right of the |
    ## 
    ##    0 | 00000000000000000000000000000111111222338
    ##    2 | 07
    ##    4 | 5
    ##    6 | 8
    ##    8 | 4
    ##   10 | 5
    ##   12 | 
    ##   14 | 
    ##   16 | 0

``` r
stem(log10(islands))
```

    ## 
    ##   The decimal point is at the |
    ## 
    ##   1 | 1111112222233444
    ##   1 | 5555556666667899999
    ##   2 | 3344
    ##   2 | 59
    ##   3 | 
    ##   3 | 5678
    ##   4 | 012

Using `scale` to control the depth of the plot (see the documentation):

``` r
stem(islands, 1)
```

    ## 
    ##   The decimal point is 3 digit(s) to the right of the |
    ## 
    ##    0 | 00000000000000000000000000000111111222338
    ##    2 | 07
    ##    4 | 5
    ##    6 | 8
    ##    8 | 4
    ##   10 | 5
    ##   12 | 
    ##   14 | 
    ##   16 | 0

``` r
stem(islands, 2)
```

    ## 
    ##   The decimal point is 3 digit(s) to the right of the |
    ## 
    ##    0 | 00000000000000000000000000000111111222338
    ##    1 | 
    ##    2 | 
    ##    3 | 07
    ##    4 | 
    ##    5 | 5
    ##    6 | 8
    ##    7 | 
    ##    8 | 
    ##    9 | 4
    ##   10 | 
    ##   11 | 5
    ##   12 | 
    ##   13 | 
    ##   14 | 
    ##   15 | 
    ##   16 | 
    ##   17 | 0

``` r
stem(islands, 0.5)
```

    ## 
    ##   The decimal point is 4 digit(s) to the right of the |
    ## 
    ##   0 | 0000000000000000000000000000000000000000134
    ##   0 | 679
    ##   1 | 2
    ##   1 | 7

``` r
stem(islands, 0.25)
```

    ## 
    ##   The decimal point is 4 digit(s) to the right of the |
    ## 
    ##   0 | 0000000000000000000000000000000000000000134679
    ##   1 | 27

------------------------------------------------------------------------

# Exercises

## 😜 Exercise 1

Use `stem` to create a stem-and-leaf plot of the `chol` variable for the
data in `heart-decease.cleveland.csv`

``` r
df <- read.csv('data/heart-decease-cleveland.csv')
head(df)
```

    ##   age sex cp trestbps chol fbs restecg thalach exang oldpeak slope  ca thal num
    ## 1  63   1  1      145  233   1       2     150     0     2.3     3 0.0  6.0   0
    ## 2  67   1  4      160  286   0       2     108     1     1.5     2 3.0  3.0   2
    ## 3  67   1  4      120  229   0       2     129     1     2.6     2 2.0  7.0   1
    ## 4  37   1  3      130  250   0       0     187     0     3.5     3 0.0  3.0   0
    ## 5  41   0  2      130  204   0       2     172     0     1.4     1 0.0  3.0   0
    ## 6  56   1  2      120  236   0       0     178     0     0.8     1 0.0  3.0   0

``` r
stem(df$chol)
```

    ## 
    ##   The decimal point is 1 digit(s) to the right of the |
    ## 
    ##   12 | 61
    ##   14 | 1997
    ##   16 | 0467892455677778
    ##   18 | 023456788223356677777788999
    ##   20 | 0111333444444556677889901111222223344566788999
    ##   22 | 0001122333455666677889990001112233334444445566679999
    ##   24 | 00001233334445556667788999000233444445566678889
    ##   26 | 00112333445566778899999001133444556778
    ##   28 | 12222333466888990344558899
    ##   30 | 022333445567889991355889
    ##   32 | 1255670055
    ##   34 | 01234
    ##   36 | 0
    ##   38 | 4
    ##   40 | 797
    ##   42 | 
    ##   44 | 
    ##   46 | 
    ##   48 | 
    ##   50 | 
    ##   52 | 
    ##   54 | 
    ##   56 | 4

## 😜 Exercise 2

Render and submit your work.
