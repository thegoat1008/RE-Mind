#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_dir=$(CDPATH= cd -- "$script_dir/.." && pwd)

# Use an explicitly configured JDK; otherwise select an installed JDK 17 on macOS.
if [ -z "${JAVA_HOME:-}" ] && [ -x /usr/libexec/java_home ]; then
  if detected_jdk=$(/usr/libexec/java_home -v 17 2>/dev/null); then
    JAVA_HOME=$detected_jdk
    export JAVA_HOME
  fi
fi

GRADLE_USER_HOME=${GRADLE_USER_HOME:-"$repo_dir/.local-gradle"}
export GRADLE_USER_HOME

cd "$repo_dir/backend"
exec ./gradlew bootRun --args=--spring.profiles.active=oni "$@"
