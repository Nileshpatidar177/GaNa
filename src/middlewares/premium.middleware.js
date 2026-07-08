router.get(
  "/downloads",
  authMiddleware,
  premiumMiddleware,
  getDownloads
);