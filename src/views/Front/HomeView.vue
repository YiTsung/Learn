<template>
    <section>
      <div class="home">
        <div class="background-clip display-1 text-center align-items-center row">
            <span>Preserved Flowers</span>
            <span class="fs-3 home-slogan">
                Beauty that doesn't wither
            </span>
        </div>
        <div class="mt-5 container-fluid">
            <div class="on-sale w-100 text-center p-5 rounded-3">
                <h2>
                    限時優惠
                    <span class="text-danger fw-bolder">８折</span>
                </h2>
                <button class="btn btn-danger btn-lg" type="button"
                    @click="openModel">點擊領取</button>
            </div>
        </div>
      </div>
    </section>
    <section  class="mt-2">
        <div  class="container d-flex">
            <div class="row g-1 w-100">
                <div data-aos="fade-right" data-aos-duration="2000" class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-start">
                    <h2 class="card1-title">何謂永生花?</h2>
                    <div class="p-3 p-lg-5 w-100 card1-text">
                        <p>永生花，又被稱為「保鮮花」、「不凋花」、「不謝花」或「禮品花」，是一種經過特殊處理的真實花朵，使其能夠保持長時間的美麗和鮮豔,
                            而不需水分或其他特殊照顧。這種處理方式使花朵能夠保持原始的外觀、質地和色彩，可以持續數個月甚至更長時間。</p>
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="2500" class="col-12 col-md-6">
                    <img src="@/assets/card1-pic.png" alt="" class="img-fluid shadow">
                </div>
            </div>
        </div>
    </section>
    <section  class="my-3">
        <div class="container py-5">
            <div class="d-flex justify-content-center"  data-aos="fade-up" data-aos-duration="3000">
                <h2 class="card2-title">永生花的好處？</h2>
            </div>
            <div class="row row-cols-1 row-cols-md-2 mt-5 text-conten">
                <div data-aos="fade-down"  data-aos-duration="1500" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-1-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">長時間保鮮</h3>
                        <p>永生花經過處理後可以保持數個月甚至更長時間的美麗，相比鮮花更持久且不需要水分或日常照顧，不用擔心換水、修剪和保養，非常適合那些沒有時間或經驗照顧植物的人。</p>
                    </div>
                </div>
                <div data-aos="fade-down"  data-aos-duration="1500" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-2-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">花粉過敏安全</h3>
                        <p>永生花在處理過程中通常會去除花粉，因此不會引起花粉過敏，適合敏感人群。</p>
                    </div>
                </div>
                <div data-aos="fade-down"  data-aos-duration="2000" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-3-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">美麗紀念</h3>
                        <p>永生花適合用來紀念特殊時刻，如婚禮、生日、紀念日等，因其持久美麗的特性，可以作為持久的回憶。</p>
                    </div>
                </div>
                <div data-aos="fade-down"  data-aos-duration="2000" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-4-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">環保友好</h3>
                        <p>由於不需要大量的水源和能源進行照顧，永生花相對環保，有助於減少水資源的浪費。</p>
                    </div>
                </div>
                <div data-aos="fade-down"  data-aos-duration="2500" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-5-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">禮品佳選</h3>
                        <p>永生花作為禮物非常受歡迎，可以傳遞感謝、祝福、愛情等情感，並且能夠持久地展示這些情感且提供了多種花種、顏色和設計，可以滿足不同需求和場合的選擇。</p>
                    </div>
                </div>
                <div data-aos="fade-down"  data-aos-duration="2500" class="col p-3 d-flex">
                    <div class="me-2">
                        <i class="bi bi-6-square-fill fs-3"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h3 class="text-title">室內裝飾</h3>
                        <p>永生花可以用來裝飾室內空間，增添自然的氛圍和美感，而不用擔心花朵凋謝。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  methods: {
    openModel () {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '優惠券領取成功',
        text: '優惠碼 SALE888',
        color: 'red',
        showConfirmButton: true
      })
    }
  }
}
</script>
<style>
.wrapper{
    margin: 0 auto;
}
.home{
    color:#4F332D;
    font-weight: bold;
}
.background-clip{
    margin: 0;
    width: 100%;
    background-position:center;
    height: calc(100vh - 60px);
    background-clip: border-box;
    background-image: url(@/assets/Home-pic.png);
    background-repeat: no-repeat;
    background-size: cover;
    text-shadow: 0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white;
    font-weight: 700;
    text-transform: uppercase;
}
.home-slogan{
    position: absolute;
    bottom: 30%;
}
.card1-title{
    font-weight: 700;
    padding: 0.5rem;
    color: brown;
    border-left: 5px solid brown;
}
.card1-text{
    font-size: 1.25rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: antiquewhite;
}
.card2-title{
    margin-top: 2rem;
    padding: 0.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: brown;
    border-left: 5px solid brown;
    background-color:antiquewhite;
}
.text-conten{
    color: #4F332D;
}
.text-title{
    margin-top: 0.4rem;
    font-weight: bold;
}
.text-conten p{
    font-size: 1.25rem;
}
</style>
