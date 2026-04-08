import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";

/**
 * Upload Router
 * Handles file uploads to S3
 */
export const uploadRouter = router({
  /**
   * Upload logo/image
   * Accepts base64 encoded image and uploads to S3
   */
  uploadLogo: protectedProcedure
    .input(
      z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Unauthorized");
      }

      // Convert base64 to buffer
      const base64Data = input.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Generate unique filename
      const timestamp = Date.now();
      const extension = input.filename.split(".").pop() || "jpg";
      const key = `logos/${ctx.user.id}-${timestamp}.${extension}`;

      // Upload to S3
      const result = await storagePut(key, buffer, input.contentType);

      return {
        success: true,
        url: result.url,
        key: result.key,
      };
    }),

  /**
   * Upload avatar/photo for talent profile
   */
  uploadAvatar: protectedProcedure
    .input(
      z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Unauthorized");
      }

      // Convert base64 to buffer
      const base64Data = input.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Generate unique filename
      const timestamp = Date.now();
      const extension = input.filename.split(".").pop() || "jpg";
      const key = `avatars/${ctx.user.id}-${timestamp}.${extension}`;

      // Upload to S3
      const result = await storagePut(key, buffer, input.contentType);

      return {
        success: true,
        url: result.url,
        key: result.key,
      };
    }),

  /**
   * Upload cover image for project
   */
  uploadProjectCover: protectedProcedure
    .input(
      z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Unauthorized");
      }

      const base64Data = input.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const timestamp = Date.now();
      const extension = input.filename.split(".").pop() || "jpg";
      const key = `projects/covers/${ctx.user.id}-${timestamp}.${extension}`;

      const result = await storagePut(key, buffer, input.contentType);

      return {
        success: true,
        url: result.url,
        key: result.key,
      };
    }),
});
