Release
==========

## Individual release

### 0. Verify build success

Before distributing a new version, verify that the current build succeeds

```
npm run build:all
```

### 1. Version upgrade

Create a patch or minor version upgrade
```
npm version patch
npm version minor
```

### 2. Add tags

Add the representative tags
```
git push && git push --tags
```

### 3. Publish

Add the representative tags
```
npm publish
```