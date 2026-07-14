#!/bin/sh
# Git credential helper: reads PAT from GIT_PAT or ~/.config/zyrca/github-pat
# Usage (one-time setup):
#   mkdir -p ~/.config/zyrca
#   printf '%s' 'ghp_your_token_here' > ~/.config/zyrca/github-pat
#   chmod 600 ~/.config/zyrca/github-pat
#
# Then push normally:
#   git push -u origin main

pat="${GIT_PAT:-}"
if [ -z "$pat" ] && [ -f "$HOME/.config/zyrca/github-pat" ]; then
  pat=$(cat "$HOME/.config/zyrca/github-pat")
fi

case "$1" in
  get)
    if [ -n "$pat" ]; then
      echo "username=nextlevelapps81-wq"
      echo "password=$pat"
    fi
    ;;
  store|erase)
    ;;
esac
