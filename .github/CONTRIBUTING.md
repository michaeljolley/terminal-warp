# Contributing

We appreciate contributions of any kind and acknowledge them on our
[README][readme]. By participating in this project, you agree to abide by our
[code of conduct](CODE_OF_CONDUCT.md).

## How Can You Contribute?

### Find a bug? See room for improvement?

Add an issue. We'll review it, add labels and reply within a few days.

### Want to work on an issue?

Comment on the issue that you'd like to work on it and we'll assign it to you.
If the issue is assigned to someone else already, you might want to ask the
contributor if they'd like some help.

### Documentation/etc need updating?

Go right ahead! Just submit a pull request when you're done.

## Commits

We use `semantic-release` to generate release notes and manage updating our
version number. Semantic Release uses
[Angular Commit Message Conventions](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)

The table below shows which commit message gets you which release type when
`semantic-release` runs:

| Commit | Release type |
| --- | --- |
| `fix: stop graphite breaking when too much pressure applied` | ~~Patch~~ Fix Release |
| `feat(pencil): add 'graphiteWidth' option` | ~~Minor~~ Feature Release |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release <br /> (Note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

## Pull Requests

First, make sure you've forked the repository. Push to your fork and
[submit a pull request](https://github.com/michaeljolley/terminal-warp/compare/)
against the `main` branch.

At this point you're waiting on us. We like to at least comment on pull requests
within three days (and, typically, one day). We may suggest some changes or
improvements or alternatives.

> If you've made code changes, be sure to update or add any necessary tests. Also,
> make sure that all tests pass.

### Code Reviews

You can often watch pull requests get reviewed live on Twitch at
[https://twitch.tv/baldbeardedbuilder](https://twitch.tv/baldbeardedbuilder).

## Improve Your Odds of Getting Merged

Some things that will increase the chance that your pull request is accepted:

- Update [README][readme] with any needed changes
- **Write/update tests.**
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

[readme]: https://github.com/MichaelJolley/vscode-vs-outlining/tree/main#readme