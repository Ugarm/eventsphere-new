<?php

namespace App\Controller\API;

use App\Managers\RegistrationManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RegistrationController extends AbstractController

{
    private LoggerInterface $logger;
    private RegistrationManager $registrationManager;

    public function __construct(
        RegistrationManager             $registrationManager,
        LoggerInterface                 $logger
    )
    {
        $this->registrationManager = $registrationManager;
        $this->logger = $logger;
    }
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {

        if ($response = $this->registrationManager->register(json_decode($request->getContent(), true))) {

            return $response;
        } else {

            return $this->registrationManager->register(json_decode($request->getContent(), true));
        }
    }

    public function index(LoggerInterface $logger): JsonResponse
    {
        $logger->info('Test log message');

        return $this->json(['message' => 'Log test']);
    }
}