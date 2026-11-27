# /strategy

The public strategy page: the Lebob Scout strategy app (Lebob-Robotics/Lebob-Scout, `npm run build:public`) with a
copy of our Foundry data in `data/`, every scout's name blanked (`scripts/export-public.mjs`). Foundry blocks GitHub's
runners, so this folder is built and committed from a machine Foundry accepts. To refresh it, from Lebob-Scout/scout-app
with the token loaded:

    npm run build:public && node scripts/export-public.mjs dist-public
    rm -rf ../../Lebob-Website/strategy && cp -r dist-public ../../Lebob-Website/strategy

then commit and push here.
