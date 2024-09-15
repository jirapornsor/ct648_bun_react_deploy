# ใช้ base image ของ Bun
FROM oven/bun:latest AS bun-builder

# กำหนดโฟลเดอร์ทำงานในคอนเทนเนอร์
WORKDIR /app

# คัดลอกโปรเจกต์ Bun เข้าไปในคอนเทนเนอร์
COPY . .

# ติดตั้ง dependencies โดยใช้ Bun
RUN bun install

# สร้างแอป (ถ้าจำเป็น)
RUN bun run build

# ใช้ Nginx ในขั้นสุดท้าย
FROM nginx:alpine-slim

# คัดลอกผลลัพธ์ที่ถูกสร้างไปยังโฟลเดอร์ที่ Nginx ใช้
COPY --from=bun-builder /app/dist /usr/share/nginx/html

# เปิดพอร์ต 80 เพื่อให้เข้าถึงแอปได้
EXPOSE 80

# เริ่มต้น Nginx
CMD ["nginx", "-g", "daemon off;"]
