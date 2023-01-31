#!/usr/bin/env bash
# Publishes a post stored in the draft folder by moving the draft file from the
# drafts folder (or where it originally was) into the POSTS folder. You can
# specify multiple drafts to move by simply tacking them on as extra arguments.
# This script takes advantage of shell file-based autocomplete, so that you
# don't have to type as much, hopefully.
POSTS=_posts
for f in "$@"
do
    basefn=$(basename "$f")
    date=$(ag 'date: "' "$f" | head -n 1 | cut -d ' ' -f 2 | tr -d '"')
    new_fn="$POSTS/$date-$basefn"

    printf "Moving %s to %s...\n" "$f" "$new_fn"
    mv "$f" "$new_fn"
done
