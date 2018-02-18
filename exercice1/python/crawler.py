#-----------------------------------------------------------------------------------------------------#
#-----------------------------------------------------------------------------------------------------#
# Crawler pour recuperer les sorts sur internet   VERSION PYTHON                                      #
# Nous avons choisi de faire une version Python pour comparer avec la version Node qui est asynchrone #
# Usage : python crawler.py > allSorts.json                                                           #
#-----------------------------------------------------------------------------------------------------#
#-----------------------------------------------------------------------------------------------------#
#-----------------------------------------------------------------------------------------------------#


import urllib2
import re
import json

from bs4 import BeautifulSoup

sorts = []
url='http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='
for x in range(1, 1976): #1976

    response = urllib2.urlopen(url+str(x))
    html = response.read()
    try:
        res =  html.split("<!-- START Spell -->",1)[1]
    except (NameError, IndexError):
        print ""
    else:
        res2 = res.split("<!-- END Spell -->",1)[0]

        name = re.findall ( "<div class='heading'><P>(.*?)</p>", res2, re.DOTALL)
        school = re.findall ( "<b>School</b>(.*?); <B>Level</b>", res2, re.DOTALL)
        levels = re.findall ( "<B>Level</b>(.*?)</p>", res2, re.DOTALL)
        casting_time = re.findall ( "<b>Casting Time</b>(.*?)</p>", res2, re.DOTALL)
        components = re.findall ( "<b>Components</b>(.*?)</p>", res2, re.DOTALL)
        rang = re.findall ( "<b>Range</b>(.*?)</p>", res2, re.DOTALL)
        effect = re.findall ( "<b>Effect</b> (.*?)</p>", res2, re.DOTALL)
        duration = re.findall ( "<b>Duration</b>(.*?)</p>", res2, re.DOTALL)
        saving_throw = re.findall ( "<b>Saving Throw</b> (.*?)<b>Spell Resistance</b>", res2, re.DOTALL)
        spell_resistance = re.findall ( "<b>Spell Resistance</b> (.*?)</p>", res2, re.DOTALL)
        description = re.findall ( "Description</div><div class='SPDesc'><p>(.*?)</p></div>", res2, re.DOTALL)

        sort = {}

        sort['_id'] = x
        
        sort['name'] = name[0]
        
        sort['school'] = school[0].lstrip()
        
        sort['levels'] = []
        
        for classe in levels[0].split(','):
            perso = {}
            try:
                classe.lstrip().split(' ')[1]
            except (NameError, IndexError):
                perso['level'] = ''
            else:
                perso['level'] = classe.lstrip().split(' ')[1]
            
            
            perso['class'] = classe.lstrip().split(' ')[0]
            if perso not in sort['levels']:
                sort['levels'].append(perso)
        
        sort['casting_time'] = casting_time[0].lstrip()
        
        components = re.sub(r"\(.*?\)", '',  components[0])
        components = components.replace(' ', '')
        sort['components'] = components.split(',')
        
        sort['range'] = rang[0].lstrip()
        
        try:
            effect[0]
        except (NameError, IndexError):
            sort['effect'] = ''
        else:
            sort['effect'] = effect[0]

        sort['duration'] = duration[0].lstrip()

        try:
            saving_throw[0]
        except (NameError, IndexError):
            sort['saving_throw'] = ''
        else:
            sort['saving_throw'] = saving_throw[0]

        try:
            spell_resistance[0]
        except (NameError, IndexError):
            sort['spell_resistance'] = ''
        else:
            if spell_resistance[0] == 'yes':
                sort['spell_resistance'] = True
            else:
                sort['spell_resistance'] = False

        cleandesc = BeautifulSoup(description[0], "lxml").text
        
        sort['description'] = cleandesc

        sorts.append(sort)


print json.dumps(sorts, sort_keys=True, indent=4, separators=(',', ': '))
