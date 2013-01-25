all:
	sw site
	#rsync -avz site.static/ wendy:./
clean:
		rm -rf site.static
